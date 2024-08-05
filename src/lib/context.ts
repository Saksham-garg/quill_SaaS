import { Pinecone } from '@pinecone-database/pinecone';
import { convertIntoAscii } from './utils';
import { getEmbeddings } from './embeddings';

const pc = new Pinecone({
  apiKey: process.env.PINECONE_DB_API_KEY!,
});
export async function getEmbeddingsFromDB(embeddings:number[],fileKey:string){
    const pinecone = new Pinecone({
            apiKey: process.env.PINECONE_DB_API_KEY!
      });
      const namespace = convertIntoAscii(fileKey)
      const index = pinecone.Index('quill-chatpdf').namespace(namespace)
    try {
        const queryResult = await index.query({
            topK:5,
            vector:embeddings,
            includeMetadata:true
        })

        return queryResult.matches || []
    } catch (error) {
        console.log("Error querying messages",error)
        throw error
    }
}

export async function getContext(query:string,fileKey:string){
    try {
        const queryEmbeddings = await getEmbeddings(query)
        const matches = await getEmbeddingsFromDB(queryEmbeddings,fileKey)

        const qualifiedDocs = matches.filter((match) => match.score && match.score > 0.7)

        type Metadata = {
            text:string,
            pageNumber:number
        }

        const docs = qualifiedDocs.map((doc) => (doc.metadata as Metadata).text)

        return docs.join('\n').substring(0,3000)
    } catch (error) {
        console.log(error)
        throw error
    }
} 