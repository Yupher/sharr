import React from 'react'
import Home from './components/Home'
import UploadState from './context/UploadState'
import './App.css';

const App = () => {
  return (
    <UploadState>
      <div className="App">
        <Home />
      </div>
    </UploadState>
  );
}

export default App;
