import logo from './bc-logo.svg';
import './App.css';
import InputData from './components/InputData'
import AnalyzedData from './components/AnalyzedData'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bitcoin Market Value Analyzer
        </p>
      </header>
      <div className="App-content">
        <div className="App-content-left">
          <InputData/>
        </div>
        <div className="App-content-right">
          <AnalyzedData/>
        </div>
      </div>
      <footer className="App-footer">
        <p>Bitcoin logo under licence CC0</p>
      </footer>
    </div>
  );
}

export default App;
