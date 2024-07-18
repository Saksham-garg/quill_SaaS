import AWS from 'aws-sdk'

export default async function(file: File): Promise<{ fileKey: string; fileName: string }> {
    try {
        const creds = new AWS.Credentials({
            accessKeyId:process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
            secretAccessKey:process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!
        })
        
        const s3 = new AWS.S3({
            credentials:creds,
            params:{
                Bucket:process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            },
            region:'eu-north-1'
        })
        
        const fileKey = 'uploads/' + new Date().toString() + file.name.replace(' ','-')
        
        const params = {
            Bucket:process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
            Key: fileKey,
            Body:file
        }
        const uplaod = s3.putObject(params).on('httpUploadProgress',(event) => {
            console.log("Uplaoding to s3...",parseInt(((event.loaded * 100)/event.total).toString())) + '%'
        }).promise()

        await uplaod.then((data:any) => {
            console.log("Uplaoded to S3",data)
        })
        return Promise.resolve({
            fileKey:fileKey,
            fileName:file.name
        })
    } catch (error) {
        console.log(error)
        return Promise.resolve({
            fileKey:'fileKey',
            fileName:'file.name'
        })
    }
}


export function getS3Url(file_key:string){
    const url = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${file_key}`
    return url
}