import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand
} from "@aws-sdk/client-s3"
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../infra/.env") });
const awsEndpoint = process.env.TF_VAR_S3_LOCATION

const client = new S3Client({
    region: process.env.TF_VAR_REGION!,
    endpoint: awsEndpoint,
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.TF_VAR_ACCESS_KEY!,
        secretAccessKey: process.env.TF_VAR_SECRET_KEY!
    }
})

export const putIntoS3 = async (key: string, body: string) => {
    try {
        const command = new PutObjectCommand({
            Bucket: process.env.TF_VAR_BUCKET_NAME,
            Key: key,
            Body: body
        })

        const response = await client.send(command)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getFromS3 = async (key: string) => {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.TF_VAR_BUCKET_NAME,
            Key: key
        })

        const response = await client.send(command)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteFromS3 = async (key: string) => {
    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.TF_VAR_BUCKET_NAME,
            Key: key
        })

        const response = await client.send(command)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}