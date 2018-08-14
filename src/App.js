import React, { Component } from 'react'
import './App.css'
import './Map.js'
import Playground from './List_Of_Playgrounds'
import List from './List_Of_Playgrounds'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class App extends Component {
  state = {
    playgroundsDetail: [
      {
        "city": "Velke Hostice",
        "address": "Zamecka 85",
        "equipment": []
      },
      {
        "city": "Velke Hostice",
        "address": "Akatova 40",
        "equipment": []
      },
      {
        "city": "Velke Hostice",
        "address": "Mirova 22",
        "equipment": []
      },
      {
        "city": "Kravare",
        "address": "Kostelni 152",
        "equipment": []
      },
      {
        "city": "Chlebicov",
        "address": "Hlavni 47",
        "equipment": []
      }
    ],

    search: ''
  }

  searchAsk = (ask) => {
    this.setState({
      search: ask.trim()
    })
  }

  render() {

    let searchedPlaygrounds

    if (this.state.search) {
      const result = new RegExp(escapeRegExp(this.state.search), 'i')
      searchedPlaygrounds = this.props.playgrounds.filter(() => result.test(playground.address))

    } else {
      searchedPlaygrounds = this.props.playgroundsDetail
    }
    
    return (
      <div className="App">
        
        <header className="App-header">
            
            <div id="firstLine">
              <img 
                src={require("./img/play1.PNG")} 
                className="App-logo" alt="logo" 
              />
              <h1 className="App-title">
                Neighborhood map of playgrounds
              </h1>
            </div>

            <p className="App-intro">
              Let's start to discover amazing places for your children! 
            </p>
        </header>

        <div id="main">

          <div id="sideBar">
                        
            <input 
              type="text" 
              placeholder="Search place" 
              id="searchField"
              value={this.state.search}
              onChange={(event) => 
                this.searchAsk(event.target.value)}
            />
            
           {/*{JSON.stringify(this.state.search)}*/}

            <div id= "list">
              <List playgrounds={this.state.playgroundsDetail}/> 
            </div>

          </div>

          <div id="map"><p>map</p>
            {/* function initMap() {
                var map;
                map = new google.maps.Map(document.getElementById('map'), {
                  center: {lat: 40, lng: -73},
                  zoom: 13
                })
              } */}
            
            <script async defer
              src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI71ndio2s7kJpHicofZyytGLd0sn3s8E&v=3&callback=initMap">
            </script>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
