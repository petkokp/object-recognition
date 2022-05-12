import { DetectLabelsCommand } from "@aws-sdk/client-rekognition";
import { RekognitionClient } from "@aws-sdk/client-rekognition";

const REGION = "eu-central-1";
const rekogClient = new RekognitionClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY || "",
  },
});

export const detectLabels = async (imageName: string) => {
  const bucket = process.env.REACT_APP_S3_BUCKET;

  const params = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: imageName,
        Credential: {},
      },
    },
  };

  try {
    const response = await rekogClient.send(new DetectLabelsCommand(params));
    return response?.Labels?.map((label) => label?.Name || '')?.filter(Boolean) || [];
  } catch (err) {
    console.error(err);
  }
};
