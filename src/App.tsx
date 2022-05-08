import { useEffect } from 'react';
import './App.css';
import { ImagesList, Upload } from './components';
import { createThumbnail } from './services/thumbnail/thumbnail.service';

function App() {
  useEffect(() => {
    createThumbnail().then(res => console.log(res)).catch((e) => console.error(e));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Upload />
      </header>
      <ImagesList />
    </div>
  );
}

export default App;
