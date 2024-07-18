import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json()
        const { fileKey,fileName } = body
        return NextResponse.json({
            fileKey,
            fileName
        },{
            status:200
        })
    } catch (error) {
        console.log(error)
        NextResponse.json({
            message:'Something went wrong'
        },{status:500})
    }
}