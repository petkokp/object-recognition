import './App.css';
import { ImagesList, Upload } from './components';

function App() {
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
