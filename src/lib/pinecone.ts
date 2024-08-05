import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { downloadFromS3 } from './db/s3-server';
import { Document, RecursiveCharacterTextSplitter} from '@pinecone-database/doc-splitter'
import { getEmbeddings } from './embeddings';
import md5 from 'md5';
import { convertIntoAscii } from './utils';

export const getPineconeClient = () => {
    const pc = new Pinecone({ 
      apiKey: process.env.PINECONE_DB_API_KEY!
    });
    return pc
}

type PageProps = {
  pageContent:string,
  metadata:{
    loc: {pageNumber:number}
  }
}

export default async function loadS3IntoPinecone(fileKey:string){
    try {
      // 1. Obtain the pdf --> Read and download the pdf.
      console.log("Downloading S3 into file system.")
      const fileName = await downloadFromS3(fileKey)
      if(!fileName){
        throw new Error("Could not download from S3")
      }
      console.log("loading pdf into memory" + fileName);
      const loader = new PDFLoader(fileName)
      const pages = (await loader.load()) as PageProps[]

      // 2. Split and segment the pdf into documents.
      const documents = await Promise.all(pages.map(prepareDocuments))

      // 3. vetorize and embedd individual documents.
      const vectors = await Promise.all(documents.flat().map(getDocumentEmbeddings))

      // 4.  Upload to pinecone db
      const client =  await getPineconeClient()
      const pineconeIndex = await client.index('quill-chatpdf')
      const namespace = pineconeIndex.namespace(convertIntoAscii(fileKey))


      console.log("inserting vectors into pinecone");
      await namespace.upsert(vectors);
      return documents[0]
    } catch (error) {
      console.log(error)
    }
}

export const getDocumentEmbeddings = async(doc:Document) => {
  try {
    const embeddings = await getEmbeddings(doc.pageContent)
    const hash = md5(doc.pageContent)

    return {
      id: hash,
      values:embeddings,
      metadata:{
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber
      }
    } as PineconeRecord
  } catch (error) {
    console.log("Error embedding document",error)
    throw error
  }
} 

export const truncateStringByBytes = (str:string,bytes:number) => {
  const enc = new TextEncoder()
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0,bytes))
}

async function prepareDocuments(page: PageProps){
  let { pageContent, metadata} = page
  pageContent = pageContent.replace(/\n/g,'')

  const splitter = new RecursiveCharacterTextSplitter()
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata:{
        pageNumber:metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent,36000)
      }}
    )
  ])

  return docs
}