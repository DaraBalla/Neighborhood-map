import React, { Component } from 'react'
import './App.css'
import MainPage from './MainPage'
import { Route } from 'react-router-dom'

class App extends Component {  

  render() {

    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <MainPage/>
        )}
        />
        
      </div>
    );
  }
}

export default App;
