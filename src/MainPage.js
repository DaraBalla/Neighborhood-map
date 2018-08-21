import React, { Component } from 'react'
import List from './List-of-playgrounds'
import Header from './Header'
import Map from './Map'
import axios from 'axios'
import ReactPropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

let searchedPlaygrounds

class MainPage extends Component {

	state = {
    playgroundsDetail: [
      {
        "city": "Velké Hoštice",
        "address": "Zámecká 197",
        "lat": 49.933055,
        "lng": 17.972581,
        "equipment": []
      },
      {
        "city": "Velké Hoštice",
        "address": "Akátová 461",
        "lat": 49.940359,
        "lng": 17.969912,
        "equipment": []
      },
      {
        "city": "Velké Hoštice",
        "address": "Mírova 119",
        "lat": 49.927919,
        "lng": 17.978811,
        "equipment": []
      },
      {
        "city": "Kravaře",
        "address": "Mírová 3033/27",
        "lat": 49.930684,
        "lng": 17.996235,
        "equipment": []
      },
      {
        "city": "Velké Hoštice",
        "address": "Pekliska 48",
        "lat": 49.939094,
        "lng": 17.97441,
        "equipment": []
      }
    ],
    places: [],
    search: ''    
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
		var map = new window.google.maps.Map(document.getElementById('map'), {
			center: {lat: 49.936089, lng: 17.973804},
			zoom: 10			
		});
		
		this.state.places.map(place => {
			var lat = place.venue.location.lat
			var lng = place.venue.location.lng
			var name = place.venue.name
			
			var marker = new window.google.maps.Marker({
				position: {lat: lat, lng: lng},
				map: map,
				title: name
			})

			var infowindow = new window.google.maps.InfoWindow({
				content: name
			});

			marker.addListener('click', function() {
				infowindow.open(map, marker)
			});

			map.addListener('click', function() {
				infowindow.close()
			});
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

  static ReactPropTypes = {
    playgroundsDetail: ReactPropTypes.array.isRequired
  }

  searchAsk = (ask) => {
    this.setState({
      search: ask.trim()
    })
  }

  render () {
    
    if (this.state.search) {
      const result = new RegExp(escapeRegExp(this.state.search), 'i')
      searchedPlaygrounds = this.state.playgroundsDetail.filter((playground) => result.test(playground.city))
      searchedPlaygrounds.sort(sortBy('address'))
    } else {
      searchedPlaygrounds = this.state.playgroundsDetail
      searchedPlaygrounds.sort(sortBy('city'))
    }

    return (
      <div className="mainPage">
				 <Header/>
			
				<div id="main">          
						<List playgrounds={this.state.playgroundsDetail} searchedPlaygroundsFromList={searchedPlaygrounds} search={this.state.search}/>            
					  <Map playgroundss={this.state.playgroundsDetail} searchedPlaygroundsFromList={searchedPlaygrounds} places={this.state.places}/>				
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