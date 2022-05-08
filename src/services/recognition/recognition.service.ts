import { DetectLabelsCommand } from "@aws-sdk/client-rekognition";
import { RekognitionClient } from "@aws-sdk/client-rekognition";

const REGION = "eu-central-1";
const rekogClient = new RekognitionClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY || '',
  },
});

const bucket = process.env.REACT_APP_S3_BUCKET;
const photo = "Capture.PNG";

const params = {
  Image: {
    S3Object: {
      Bucket: bucket,
      Name: photo,
      Credential: {},
    },
  },
};

export const detectLabels = async () => {
  try {
    debugger;
    const response = await rekogClient.send(new DetectLabelsCommand(params));
    debugger;
    console.log(response.Labels);
    response?.Labels?.forEach((label) => {
      console.log(`Confidence: ${label.Confidence}`);
      console.log(`Name: ${label.Name}`);
      console.log("Instances:");
      label?.Instances?.forEach((instance) => {
        console.log(instance);
      });
      console.log("Parents:");
      label?.Parents?.forEach((name) => {
        console.log(name);
      });
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
