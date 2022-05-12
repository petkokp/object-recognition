import { useEffect, useState } from "react";
import {
  ImageList,
} from "@mui/material";
import { listImages } from "../../services";
import { Image, ImageMetadata } from '../Image';

export const ImagesList = () => {
  const [images, setImages] = useState<ImageMetadata[]>([]);

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
    <ImageList>
      {images.map((item) => (
        <Image item={item} />
      ))}
    </ImageList>
  );
};
