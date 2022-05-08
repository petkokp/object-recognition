const AWS = require("aws-sdk");
const sharp = require("sharp");
const axios = require("axios");
/* Amplify Params - DO NOT EDIT
	AUTH_OBJECTRECOGNITION0D9C86A2_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 
 exports.handler = async (event) => {
   // extract from the event context the following:
   // - outputRoute and outputToken which we'll need to send back the modified object
   // - inputS3Url, which we'll need to get original object from the bucket
   const {outputRoute, outputToken, inputS3Url} = event.getObjectContext || {}; 

   console.log(event);
 
   // Get original image from S3 with help of inputS3Url parameter 
   // we are retriving the image, that's why setting responseType to 'arraybuffer'
   const { data : originalImage } = await axios.get(inputS3Url, {
       responseType: 'arraybuffer'
   });
 
   // Resise the original image and convert the result to buffer
   const thumbnail = await sharp(originalImage)
     .resize({ width: 100 })
     .toBuffer();
 
   //Construct the client with an endpoint override so the request lands in the right place
   const client = new AWS.S3({ region: "eu-central-1", endpoint: "s3-object-lambda.eu-central-1.amazonaws.com"});
 
   // Override the signing service name from s3 to s3-object-lambda so the signatures are valid.
   client.__proto__.api.endpointPrefix = "s3-object-lambda";
 
   const params = {
       RequestRoute: outputRoute,
       RequestToken: outputToken,
       Body: thumbnail
   };
   
   // send the transformed object
   await client.writeGetObjectResponse(params).promise();
   
   return {
       statusCode: 200
   };
 };