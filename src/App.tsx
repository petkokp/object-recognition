import { useEffect } from "react";
import "./App.css";
import { ImagesList, Upload } from "./components";
// import { createThumbnail } from "./services/thumbnail/thumbnail.service";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { /* detectLabels, */ signOut } from "./services";

function App() {
  useEffect(() => {
    // detectLabels().then((res) => console.log(res)).catch((e) => console.error(e));
    // createThumbnail().then(res => console.log(res)).catch((e) => console.error(e));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Upload />
      </header>
      <ImagesList />
      <button
        onClick={() => {
          signOut()
            .then(() => window.location.reload())
            .catch((e) => console.error(e));
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default withAuthenticator(App);
