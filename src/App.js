import React, { Component } from 'react';
import './App.css';
import './Map.js';
import Playground from './List_Of_Playgrounds'

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <header className="App-header">
            <div id="firstLine">
              <img src={require("./img/play1.PNG")} className="App-logo" alt="logo" />
              <h1 className="App-title">Neighborhood map of playgrounds</h1>
            </div>
            <p className="App-intro">
              Let's start to discover amazing places for your children! 
            </p>
        </header>

        <div id="main">

          <div id="sideBar">
            
            <div id="searchBar">
              <input type="text" value="Search place" id="searchField"/>
            </div>

            <div id= "list"><p>list</p>
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
