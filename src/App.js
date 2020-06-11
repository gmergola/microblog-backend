import React from 'react';
import NavBar from "./NavBar";
import Routes from "./Routes"

import './App.css';

/* Renders NavBar and Routes
*/

function App() {
  return (
    <div className="App container">
      <NavBar />
      <Routes />
    </div>
  );
}

export default App;
