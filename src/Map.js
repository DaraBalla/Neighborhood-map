import React, { Component } from 'react'
import axios from 'axios';

//let searchedPlaygrounds

class Map extends Component {
	
	state = {
		places: []
	}


	//Load the map after rendering the DOM
	componentDidMount() {
		this.loadPlaces()
		
	}

	//Load the map with the proper KEY using the initMap function
	loadScript() {
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
				title: 	name
			})
		})
	}

	//Fetch Foursquare API data using axios (search for "playgrounds" near the "center" of the map)
	loadPlaces() {
		
		axios.get('https://api.foursquare.com/v2/venues/explore?client_id=OR4GRJXCDX0LRD5QLD0WNGWYF3X1DRO0DJC02T4LIRY1WCVF&client_secret=5JX4DRFPLNQUZVWUOY2KSUJCEFOX5X3USMZJHHW4PI5RUAEH&v=20180323&limit=50&ll=49.9,17.9&query=playground')
		.then(response => {
			// handle success
			this.setState({ 
				places: response.data.response.groups[0].items
			}, this.loadScript())
		})
		.catch(error => {
			// handle error
			console.log("Sorry, this error has occured: " + error);
		})
	}

	render() {
		
		//searchedPlaygrounds = this.props.searchedPlaygroundsFromList
		console.log(this.state.places)
		//console.log(searchedPlaygrounds)

		return(
			<div className="map-container">
				<div id="map"> 

				</div>
			</div>
		);
	
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

export default Map