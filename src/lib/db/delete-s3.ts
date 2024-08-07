import { DeleteObjectCommandOutput, PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3";

export async function deleteFromS3(fileKey:string): Promise<string | undefined>{
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

        s3.deleteObject(params, function (err:any, data: DeleteObjectCommandOutput | undefined) {
            if (err) console.log(err);
            else{
                console.log(
                    "Successfully deleted file from bucket"
                );
            }
            console.log(data);
            return resolve(data)
        });

    } catch (error) {
        console.log(error)
        reject(error);
        return null;
    }
})
}