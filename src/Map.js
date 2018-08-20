import React, { Component } from 'react'

//let searchedPlaygrounds

class Map extends Component {
	
	componentDidMount() {
		this.loadScript()
	}

	loadScript = () => {
		script("https://maps.googleapis.com/maps/api/js?key=AIzaSyDI71ndio2s7kJpHicofZyytGLd0sn3s8E&callback=initMap")
		window.initMap = this.initMap;
	}

	initMap() {
		var map = new window.google.maps.Map(document.getElementById('map'), {
			center: {lat: 49.936089, lng: 17.973804},
			zoom: 13
		});
	}

	render() {
		
		//searchedPlaygrounds = this.props.searchedPlaygroundsFromList

		//console.log(searchedPlaygrounds)

		return(
			<div className="map-container">
				<div id="map"> 

				</div>
			</div>
		);
	
	}
}

	function script(www) {
		var anchor = window.document.getElementsByTagName("script")[0];
		var script = window.document.createElement("script");
		anchor.parentNode.insertBefore(script, anchor);
		script.src = www;
		script.async = true;
		script.defer = true;
	}

export default Map