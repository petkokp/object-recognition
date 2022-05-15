import { Button } from "@mui/material";
import { signOut } from "../../services";

export const Logout = () => {
  return (
    <Button
      variant="contained"
      component="label"
      onClick={() => {
        signOut()
          .then(() => window.location.reload())
          .catch((e) => console.error(e));
      }}
    >
      Log out
    </Button>
  );
};
