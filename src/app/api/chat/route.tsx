import { Configuration, OpenAIApi } from "openai-edge";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
const config = new Configuration({
    apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
    basePath:'http://localhost:3040/v1'
})
export const runtime = 'edge'
const openai = new OpenAIApi(config)
export async function POST(req: Request){
    try {
        const { messages } = await req.json()
        const response = await openai.createChatCompletion({
            model:'gpt-3.5-turbo',
            messages:messages,
            stream:true
        })
        const stream = OpenAIStream(response)
        return new StreamingTextResponse(stream)
    } catch (error) {
        console.log(error)
    }
}