import logo from './bc-logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bitcoin Market Value Analyzer
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <div className="App-content">
        <div className="App-content-left">
          Historical dates to inspect<br/>
          From:<br/>
          To:
        </div>
        <div className="App-content-right">
          Longest bearish trend in days:<br/>
          From:<br/>
          To:<br/>
          Highest trading volume:<br/>
          Best day for buying:<br/>
          Best day for selling:
        </div>
      </div>
      <footer className="App-footer">
        <p>Bitcoin logo under licence CC0</p>
      </footer>
    </div>
  );
}

export default App;
