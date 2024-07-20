import { PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3";
export default async function(file: File): Promise<{ fileKey: string; fileName: string }> {
    return new Promise((resolve, reject) => {
    try {
        const s3 = new S3({
            credentials:{
                accessKeyId:process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
                secretAccessKey:process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!
            },
            region:'eu-north-1'
        })
        
        
        const fileKey = "uploads/" + Date.now().toString() + file.name.replace(" ", "-");
        
        const params = {
            Bucket:process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
            Key: fileKey,
            Body:file
        }
     
        s3.putObject(
            params,
            (err: any, data: PutObjectCommandOutput | undefined) => {
              return resolve({
                fileKey,
                fileName: file.name,
              });
            }
          );
    } catch (error) {
        reject(error);
    }
})
}


export function getS3Url(file_key:string){
    const url = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${file_key}`
    return url
}