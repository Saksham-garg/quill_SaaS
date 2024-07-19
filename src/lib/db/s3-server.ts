import { S3 } from "@aws-sdk/client-s3";
import fs from 'fs'
export async function downloadFromS3(fileKey:string): Promise<string>{
    return new Promise(async (resolve, reject) => {
    try {
        const s3 = new S3({
            credentials:{
                accessKeyId:process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
                secretAccessKey:process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!
            },
            region:'eu-north-1'
        })
        
        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
            Key:fileKey
        }
        const obj = await s3.getObject(params)
        const fileName = `/tmp/elliott${Date.now().toString()}.pdf`;
        if (obj.Body instanceof require("stream").Readable) {
            // AWS-SDK v3 has some issues with their typescript definitions, but this works
            // https://github.com/aws/aws-sdk-js-v3/issues/843
            //open the writable stream and write the file
            const file = fs.createWriteStream(fileName);
            file.on("open", function (fd) {
              // @ts-ignore
              obj.Body?.pipe(file).on("finish", () => {
                return resolve(fileName);
              });
            });
            // obj.Body?.pipe(fs.createWriteStream(file_name));
          }

    } catch (error) {
        console.log(error)
        reject(error);
        return null;
    }
    })
}   