import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomeContainer from './HomeContainer';
import { Route } from 'react-router'

import ReadDifficulty from "./ReadDifficulty";
import SetPrediction from "./SetPrediction";
class App extends Component {

render() {

  return (

    <div className="App">
        <Route exact path="/" component={HomeContainer}/>
    </div>
  );
}

}

export default App;
