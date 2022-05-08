import { API } from 'aws-amplify';

export const createThumbnail = async () => {
  const res = await API.get('createThumbnail', '/createThumbnail', {});
  console.log(res);
}