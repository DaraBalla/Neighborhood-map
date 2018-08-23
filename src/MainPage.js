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

  
	//Initialize map in a <div id="map"> and set the center and zoom
	initMap = () => {
		  map = new window.google.maps.Map(document.getElementById('map'), {
			center: {lat: 49.936089, lng: 17.973804},
			zoom: 10			
    });
    
    this.state.places.map(place => {

        var lat = place.venue.location.lat
        var lng = place.venue.location.lng
        var name = place.venue.name
        var city = place.venue.location.city
        
        let marker = new window.google.maps.Marker({
          id: lat,
          position: {lat: lat, lng: lng},          
          title: city
        })

        let infowindow = new window.google.maps.InfoWindow({
          content: name
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker)
        });

        map.addListener('click', function() {
          infowindow.close()
        })

        markers.push(marker)

        if (markers.length === 6) {
         this.setState({
            markers: markers
          })
        }
      })
   }
   
	//Fetch Foursquare API data using axios (search for "playgrounds" near the "center" of the map)
	loadPlaces = () => {
		
      axios.get('https://api.foursquare.com/v2/venues/explore?client_id=OR4GRJXCDX0LRD5QLD0WNGWYF3X1DRO0DJC02T4LIRY1WCVF&client_secret=5JX4DRFPLNQUZVWUOY2KSUJCEFOX5X3USMZJHHW4PI5RUAEH&v=20180323&limit=50&ll=49.9,17.9&query=playground')
      .then(response => {
        // handle success
        this.setState({ 
          places: response.data.response.groups[0].items
        })
      })
      .catch(error => {
        // handle error
        alert("Sorry! Foursquare data didn't load correctly, not your fault! This error has occured: " + error); 
      })
      .then(() => {
        // load map in any case (with or without Foursquare data)
        this.loadScript()
      })
	}

  
  

  showMarkers = (array) => {

    //Store all locations latitudes of the array items 
    var searchedPlaygroundsLat = []
    
    //Loop through the array items, store their locations latitudes in a var locLat and push them in the 'searchedPlaygroundsLat' array
    array.map(sp => {
      var locLat = sp.venue.location.lat
      searchedPlaygroundsLat.push(locLat)
    })
    
    console.log(searchedPlaygroundsLat)
      

    var markerPosition = []                                                                                                    
   
   
    //Loop through all markers
    markers.map(marker => {
      var markerId = marker.id
      markerPosition.push(markerId)

      console.log(markerPosition)
  

      // - if markers id number is in the 'searchedPlaygroundsLat' array, show the marker on the map
      if(searchedPlaygroundsLat.some(x => x = markerId)) {
        marker.setMap(map)
      }
      // - if there is no match, set that marker setMap to null
      else {
        marker.setMap(null)
      }
    })
    
        //This is for my check that it should be a match
        if(searchedPlaygroundsLat[3] === markerPosition[3]) {
          console.log("Match!")
        } else {
          console.log("not match!")
        }
  }

  searchAsk = (ask) => {
    this.setState({
      search: ask.trim()
    })
  }

  render () {
    
    if (this.state.search) {
      const result = new RegExp(escapeRegExp(this.state.search), 'i')
      
      searchedPlaygrounds = this.state.places.filter((playground) => result.test(playground.venue.location.city))
      searchedPlaygrounds.sort(sortBy('venue.location.address'))
      this.showMarkers(searchedPlaygrounds)
    } else {
      searchedPlaygrounds = this.state.places
      searchedPlaygrounds.sort(sortBy('venue.location.city'))
      this.showMarkers(searchedPlaygrounds)
    }
    
    


    return (
      <div className="mainPage">
				 <Header/>
			
				<div id="main">          
            <List 
              searchedPlaygrounds={searchedPlaygrounds} 
              search={this.state.search} 
              places={this.state.places}
              searchAsk={this.searchAsk}
              infowindow={this.initMap.infowindow}
              map={this.map}           
              marker={this.marker}
              name={this.name}/>            
            <Map 
              searchedPlaygrounds={searchedPlaygrounds} 
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