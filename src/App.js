import React, { Component } from 'react'
import './App.css'
import MainPage from './MainPage'
import Header from './Header'
import { Route } from 'react-router-dom'

class App extends Component {
  

  render() {

    return (
      <div className="App">
        <Header/>
        <MainPage/>     
      </div>
    );
  }
}

export default App;
