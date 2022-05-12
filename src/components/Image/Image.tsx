import { useState } from 'react';
import {
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Owner } from "@aws-sdk/client-s3";
import { detectLabels } from "../../services";

export type ImageMetadata = {
  key: string | undefined;
    etag: string | undefined;
    owner: Owner | undefined;
}

export interface ImageProps {
  item: ImageMetadata
}

export const Image = ({ item }: ImageProps) => {
  const [labels, setLabels] = useState<string[] | undefined>([]);

  return (
    <ImageListItem key={item.key} style={{ width: "33%", overflow: "hidden" }}>
      <img
        src={`${process.env.REACT_APP_IMAGES_BUCKET_URL}/${item.key}`}
        alt={item.key}
        loading="lazy"
      />
      <ImageListItemBar
        title={item.key}
        subtitle={
          <span style={{ cursor: "pointer" }}>
            Click here to recognize the image!
          </span>
        }
        position="below"
        onClick={async () => {
          if (item.key) setLabels(await detectLabels(item.key));
        }}
      />
      <List>
        {labels?.length ? "This is:" : ""}
        {labels?.map((label) => (
          <ListItem>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </ImageListItem>
  );
};
