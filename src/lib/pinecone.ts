import { Pinecone } from '@pinecone-database/pinecone';

export const getPineconeClient = () => {
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_DB_API_KEY!
    });
    return pc
}


