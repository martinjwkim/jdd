import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation'
import Routes from './Routes'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;

//bigger font
//total points
//animation when losing
//winner screen
//edit last hand
//match history
//icon instead of numbers
