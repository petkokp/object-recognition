import { ChangeEvent, useState } from "react";
import { uploadImage } from "../../services";

export const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [response, setResponse] = useState("Upload a new image!");

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSelectedFile(e!.target!.files![0]);

  const uploadFile = async (file: File) => {
    const params = {
      Body: file,
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: file.name,
      ContentType: 'image/png',
    };

    try {
      await uploadImage(params);
      setResponse("Successfully upload the image!");
    } catch (error) {
      setResponse("Error while trying to upload the image!");
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} />
      <button
        onClick={() => {
          if (selectedFile) uploadFile(selectedFile);
        }}
      >
        {" "}
        Upload image
      </button>
      <div>{response}</div>
    </div>
  );
};
