import React, { Component } from 'react'
import List from './List-of-playgrounds'
import Header from './Header'
import axios from 'axios'
//import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

//let searchedPlaygrounds

let markers = []
let searchedPlaygrounds

class MainPage extends Component {
  map = {};

  state = {
    places: [],
    search: '',
    displayedMarkers: [],
    fetchedMarkers: [],
    searchedPlaygrounds: []
  }

  //Load the map after rendering the DOM
  componentDidMount = () => {
    this.loadPlaces()
  }

  //Load the Google map with the proper KEY using the initMap function
  loadScript = () => {
    createScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDI71ndio2s7kJpHicofZyytGLd0sn3s8E&callback=initMap")
    window.initMap = this.initMap;
    window.gm_authFailure = function () {
      alert("Google Map authorization error. Please try refreshing the page.");
    }
  }

  //Fetch Foursquare API data using axios (search for "playgrounds" near the "center" of the map)
  loadPlaces = () => {
    axios.get('https://api.foursquare.com/v2/venues/explore?client_id=OR4GRJXCDX0LRD5QLD0WNGWYF3X1DRO0DJC02T4LIRY1WCVF&client_secret=5JX4DRFPLNQUZVWUOY2KSUJCEFOX5X3USMZJHHW4PI5RUAEH&v=20180323&limit=50&ll=49.9,17.9&query=playground')
      .then(response => {
        // handle success, store the loaded data in a state: places and then load script and initialize map
        this.setState({
          places: response.data.response.groups[0].items,
          searchedPlaygrounds: response.data.response.groups[0].items
        })
      })
      .catch(error => {
        // handle error
        alert("Sorry! Foursquare data didn't load correctly, not your fault! This error has occured: " + error + ". Try to reload the page!");
      })
      .then(() => {
        // load map in any case (with or without Foursquare data)
        this.loadScript()
      })
  }

  //if there is some content in the state.search (= search input), filter the places and store them in the searchedPlaygrounds array
  filterList = (query) => {
    if (query !== '') {
      //const result = new RegExp(escapeRegExp(this.state.search), 'i')      
      searchedPlaygrounds = this.state.places.filter((playground) => playground.venue.location.city.toUpperCase().includes(query.toUpperCase()))
      searchedPlaygrounds.sort(sortBy('venue.location.address'))
      this.setState({ searchedPlaygrounds });
      this.deleteMarkers();
      this.filterMarkers(query);
      // if there is no input, the array searchedPlaygrounds contains all places    
    } else {
      searchedPlaygrounds = this.state.places
      searchedPlaygrounds.sort(sortBy('venue.location.city'))
      this.setState({ searchedPlaygrounds })
      this.deleteMarkers();
      this.createMarkers();
    }
    this.setState({
      search: query
    })
  }

  filterMarkers = (query) => {
    let filteredMarkers = this.state.fetchedMarkers.filter((marker) => marker.name.toUpperCase().includes(query.toUpperCase()))
    this.setState({ displayedMarkers: filteredMarkers });

    filteredMarkers.map(marker => {
      marker.setMap(this.map)
      marker.addListener('click', function () {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function () {
          marker.setAnimation(null)
        }, 200);
        /* infowindow.setContent("<h3 tabIndex='0'>" + name + "</h3>");
        infowindow.open(map, marker) */
      });
    })
  }

  //Initialize map in a <div id="map"> and set the center and zoom
  initMap = () => {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 49.936089, lng: 17.973804 },
      zoom: 10
    });
    this.createMarkers();
  }

  //delete all the markers if they exist
  deleteMarkers = () => {
    if (this.state.displayedMarkers.length) {
      this.state.displayedMarkers.forEach(function (marker) {
        marker.setMap(null);
      });
    }
  }

  //create markers
  createMarkers = () => {
    //for storing all searched markers - make the array empty
    markers = [];

    //create a single infowindow
    let infowindow = new window.google.maps.InfoWindow();
    //close the infowindow by clicking on a map
    this.map.addListener('click', function () {
      infowindow.close()
    })
    let self = this;
    //loop through searchedPlaygrounds and create them Markers
    this.state.places.map((place) => {

      var lat = place.venue.location.lat
      var lng = place.venue.location.lng
      var name = place.venue.name
      var city = place.venue.location.city

      let marker = new window.google.maps.Marker({
        id: lat,
        position: { lat: lat, lng: lng },
        title: name,
        //map: map,
        name: city,
        label: "P"
      })

      //assign a click event to every marker
      marker.addListener('click', function () {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function () {
          marker.setAnimation(null)
        }, 200);
        infowindow.setContent("<h3 tabIndex='0'>" + name + "</h3>");

        infowindow.open(this.map, marker)
      });
      marker.setMap(self.map);
      //store all markers in the array
      markers.push(marker)

    })

    //push the markers array to the state
    this.setState({
      displayedMarkers: markers,
      fetchedMarkers: markers
    })
  }

  //push the content of search field to the state and then reload the map
  searchAsk = (ask) => {
    this.setState({
      search: ask.trim()
    })
  }

  render() {

    return (
      <div className="mainPage">
        <Header />

        <main id="main" role="main">
          <List
            searchedPlaygrounds={this.state.searchedPlaygrounds}
            search={this.state.search}
            searchAsk={this.searchAsk}
            markers={this.state.displayedMarkers}
            filterList={this.filterList}
            initMap={this.initMap}
          />

          <div id="map" aria-label="google-map" role="application"></div>

        </main>

      </div>
    )
  }
}

//Create a <script src="www" async defer></script> tag for inserting the API KEY  
function createScript(www) {
  var anchor = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  anchor.parentNode.insertBefore(script, anchor);
  script.src = www;
  script.async = true;
  script.defer = true;
  script.onerror = (error) => {
    alert("Sorry! Google Maps didn't load correctly, not your fault! This error has occured: " + error + ". Try to reload the page!")
  }
}

export default MainPage