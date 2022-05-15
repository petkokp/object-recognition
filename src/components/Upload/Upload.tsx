import { ChangeEvent, useState } from "react";
import { Button } from "@mui/material";
import { uploadImage } from "../../services";

export const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [response, setResponse] = useState("Select a new image!");

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e!.target!.files![0]);
    setResponse("You have selected an image and can upload it now!");
  }

  const uploadFile = async (file: File) => {
    const params = {
      Body: file,
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: file.name,
      ContentType: "image/png",
    };

    try {
      await uploadImage(params);
      setResponse("Successfully uploaded the image! You can find it in View Images!");
    } catch (error) {
      setResponse("Error while trying to upload the image :(");
      console.error(error);
    }
  };

  return (
    <div>
      <Button variant="contained" component="label" style={{ marginRight: 20 }}>
        Select image
        <input
          type="file"
          hidden
          accept="image/png, image/jpeg"
          onChange={handleFileInput}
        />
      </Button>
      <Button
        disabled={!selectedFile}
        variant="contained"
        component="label"
        onClick={() => {
          if (selectedFile) uploadFile(selectedFile);
        }}
      >
        Upload image
      </Button>
      <div style={{ marginTop: 20 }}>{response}</div>
    </div>
  );
};
