import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
  ListObjectsCommandInput,
  PutObjectCommandInput,
  DeleteObjectCommandInput,
} from "@aws-sdk/client-s3";

const REGION = "eu-central-1";

const s3 = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: process.env.IDENTITY_POOL_ID || '',
  }),
});

export const listImages = async (input: ListObjectsCommandInput) => s3.send(new ListObjectsCommand(input));

export const uploadImage = async (input: PutObjectCommandInput) => s3.send(new PutObjectCommand(input));

export const deleteImage = async (input: DeleteObjectCommandInput) => s3.send(new DeleteObjectCommand(input));




