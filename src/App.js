import React, { Component } from 'react'
import './App.css'
import MainPage from './MainPage'
import NewPlayground from './Add-new-playground'
import { Route } from 'react-router-dom'

class App extends Component {
  

  render() {

    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <MainPage/>
        )}
        />
        <Route path="/add" render={() => (
          <NewPlayground/>
        )} />
      </div>
    );
  }
}

export default App;
