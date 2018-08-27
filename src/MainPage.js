import React, { Component } from 'react'
import List from './List-of-playgrounds'
import Header from './Header'
import Map from './Map'
import axios from 'axios'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

let searchedPlaygrounds
var map
let markers = []
let infoWinds = []

class MainPage extends Component {

	state = {
    places: [],
    search: '',
    markers: [],
    searchedPlaces: []    
  }

	//Load the map after rendering the DOM
	componentDidMount = () => {
		this.loadPlaces()		
	}

	//Load the map with the proper KEY using the initMap function
	loadScript = () => {
		createScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDI71ndio2s7kJpHicofZyytGLd0sn3s8E&callback=initMap")
		window.initMap = this.initMap;
	}
  //Fetch Foursquare API data using axios (search for "playgrounds" near the "center" of the map)
  loadPlaces = () => {
		
    axios.get('https://api.foursquare.com/v2/venues/explore?client_id=OR4GRJXCDX0LRD5QLD0WNGWYF3X1DRO0DJC02T4LIRY1WCVF&client_secret=5JX4DRFPLNQUZVWUOY2KSUJCEFOX5X3USMZJHHW4PI5RUAEH&v=20180323&limit=50&ll=49.9,17.9&query=playground')
    .then(response => {
      // handle success
      this.setState({ 
        places: response.data.response.groups[0].items
      }, this.loadScript())
    })
    .catch(error => {
      // handle error
      alert("Sorry! Foursquare data didn't load correctly, not your fault! This error has occured: " + error); 
    })
    /*.then(() => {
      // load map in any case (with or without Foursquare data)
      this.loadScript()
    })*/
  }
  
  
	//Initialize map in a <div id="map"> and set the center and zoom
	initMap = () => {
		  map = new window.google.maps.Map(document.getElementById('map'), {
			center: {lat: 49.936089, lng: 17.973804},
			zoom: 10			
    });

    if (this.state.search) {
      const result = new RegExp(escapeRegExp(this.state.search), 'i')
      
      searchedPlaygrounds = this.state.places.filter((playground) => result.test(playground.venue.location.city))
      searchedPlaygrounds.sort(sortBy('venue.location.address'))
      
    } else {
      searchedPlaygrounds = this.state.places
      searchedPlaygrounds.sort(sortBy('venue.location.city'))
      
    }
    markers = []

    let infowindow = new window.google.maps.InfoWindow();

    searchedPlaygrounds.map(place => {
  
        var lat = place.venue.location.lat
        var lng = place.venue.location.lng
        var name = place.venue.name
        var city = place.venue.location.city
        
        let marker = new window.google.maps.Marker({
          id: lat,
          position: {lat: lat, lng: lng},          
          title: city,
          map: map
        })

        
        infoWinds.push(infowindow)

        marker.addListener('click', function() {
          infowindow.setContent(city),
          infowindow.open(map, marker),
          toggleBounce()
        });

        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
          }
        }
        map.addListener('click', function() {
          infowindow.close(),
          marker.setAnimation(null)
        })

        markers.push(marker)

      })

      this.setState({
        searchedPlaces: markers
      })
   }
   
	
/*
  showMarkers = (array) => {
    
    var searchedPlaygroundsLat = [] //Store all locations latitudes of the array items 
    
    array.map(sp => { //Loop through the array items, store their locations latitudes in a var locLat and push them in the 'searchedPlaygroundsLat' array
      var locLat = sp.venue.location.lat
      searchedPlaygroundsLat.push(locLat)
    })
    
    var markerPosition = []         
    
    markers.map(marker => { //Loop through all markers
      var markerId = marker.id
      markerPosition.push(markerId)

  
      if(searchedPlaygroundsLat.some(x => x = markerId)) { // - if markers id number is in the 'searchedPlaygroundsLat' array, show the marker on the map
        marker.setMap(map)//console.log(marker.title) 
      } else { // - if there is no match, set that marker setMap to null
        marker.setMap(null)
      }
    })console.log(searchedPlaygroundsLat)
    console.log(markerPosition)*/
   
    /*//This is for my check that it should be a match
        if(searchedPlaygroundsLat[1] === markerPosition[1]) {
          console.log("Match!")
        } else {
          console.log("not match!")
        }*/
  
  searchAsk = (ask) => {
    this.setState({
      search: ask.trim()
    }, this.initMap())
  }

  render () {
    
    return (
      <div className="mainPage">
				 <Header/>
			
				<div id="main">          
            <List 
              searchedPlaygrounds={this.state.searchedPlaces} 
              search={this.state.search} 
              places={this.state.places}
              searchAsk={this.searchAsk}
              infowindow={this.initMap.infowindow}
              map={this.map}           
              marker={this.marker}
              name={this.name}
              infoWinds={infoWinds}/>            
            <Map 
              searchedPlaygrounds={this.state.searchedPlaces} 
              places={this.state.places}/>				
				</div>

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
}

export default MainPage