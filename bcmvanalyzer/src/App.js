import logo from './bc-logo.svg';
import './App.css';
import React, { useState } from 'react'
import InputData from './components/InputData'
import AnalyzedData from './components/AnalyzedData'

function App() {

  const [newFrom, setNewFrom] = useState("")
  const [newTo, setNewTo] = useState("")

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
          <InputData newFrom={newFrom} setNewFrom={setNewFrom} 
            newTo={newTo} setNewTo={setNewTo}/>
        </div>
        <div className="App-content-right">
          <AnalyzedData newFrom={newFrom} newTo={newTo}/>
        </div>
      </div>
      <footer className="App-footer">
        <p>Bitcoin logo under licence CC0<br/>
          <span className="Copyright">© Mika Viitaniemi 2021</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
