import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TicTacOld from './applications/TictacOld';
import Game from './applications/Tictac/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="wrapper">
          <div className="item-wrapper">
            <TicTacOld/>
          </div>
          <div className="item-wrapper-2">
            <Game/>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
