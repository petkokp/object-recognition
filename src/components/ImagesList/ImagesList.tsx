import { Owner } from "@aws-sdk/client-s3";
import { useEffect, useState } from "react";
import { listImages } from "../../services";

type Image = {
  key: string | undefined;
  etag: string | undefined;
  owner: Owner | undefined;
};

export const ImagesList = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    listImages({
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Delimiter: "/",
    })
      .then((res) => {
        console.log(res);
        setImages(
          res?.Contents?.map((item) => ({
            key: item.Key,
            etag: item.ETag,
            owner: item.Owner,
          })) || []
        );
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      {images.map((image) => (
        <>
          <ul>
            <li>Key: {image.key}</li>
            <li>ETag: {image.etag}</li>
            <li value={`${image.owner}`}></li>
          </ul>
          <br />
        </>
      ))}
    </div>
  );
};
