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
          <ul key={image.key}>
            <img src={`${process.env.REACT_APP_IMAGES_BUCKET_URL}/${image.key}`} width={200} />
            <li>Name: {image.key}</li>
          </ul>
          <br />
        </>
      ))}
    </div>
  );
};
