import './css/App.css';
import './css/index.css';
import AutoSuggest from './AutoSuggest.js';

function App() {
  return (
    <div className="App container-fluid pt-5 pb-5 bg-primary">
      {/* <header className="App-header"> */}
        <AutoSuggest />
      {/* </header> */}
    </div>
  );
}

export default App;
