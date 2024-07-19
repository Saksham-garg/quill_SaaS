import { db } from "@/lib/db"
import { getS3Url } from "@/lib/db/s3"
import { chats } from "@/lib/db/schema"
import loadS3IntoPinecone from "@/lib/pinecone"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
    try {
        const { userId} = await auth()
        if(!userId){
            return NextResponse.json({message:"Unauthorized"},{status:401})
        }
        const body = await req.json()
        const { fileKey,fileName } = body
        await loadS3IntoPinecone(fileKey)
        const chatsId = await db.insert(chats).values({
            fileKey:fileKey,
            pdfName:fileName,
            pdfUrl:getS3Url(fileKey),
            userId
        }).returning({
            insertedId:chats.id
        })

        return NextResponse.json({
            chatsId:chatsId[0].insertedId
        },
        {status:200})
    } catch (error) {
        console.log(error)
        NextResponse.json({
            message:'Something went wrong'
        },{status:500})
    }
}