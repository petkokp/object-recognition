import { Auth } from "aws-amplify";

export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    return await Auth.currentAuthenticatedUser();
  } catch (error) {
    console.error(error);
  }
}
