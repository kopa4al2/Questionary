import React, { Component } from 'react';
import QuestionForm from './Components/QuestionForm';
import GameOver from './Components/GameOver';
import HighScores from './Components/HighScores';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
      <div className="wrapper">
          <div className="main">
          <QuestionForm gameover=""/>
          </div>
          <div className="right">
          <GameOver/>
          </div>
          <div className="left">
          <HighScores/>
          </div>
      </div>
    );
  }
}

export default App;
