import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

let searchedPlaygrounds

class Map extends Component {
	
	state = {
		isMarkerShown: false,
		
	}

	handleMarkerClick = () => {
		this.setState({ isMarkerShown: false })
	}

	render() {
		let playgrounds = this.props.playgroundss
		/*let playgroundLat = playgrounds.map((playground) => playground.lat)
		let playgroundLng = playgrounds.map((playground) => playground.lng)*/
		searchedPlaygrounds = this.props.searchedPlaygroundsFromList


		const PlaygroundsMap = withScriptjs(withGoogleMap(props => (
			<GoogleMap
				defaultCenter = { { lat: 49.936089, lng: 17.973804 } }
				defaultZoom = { 13 }
			>
			{searchedPlaygrounds.map((marker) =>
			<Marker position={{ lat: marker.lat, lng: marker.lng }} /> )}
			</GoogleMap>
		)))

		console.log(searchedPlaygrounds)

		return(
			<div className="map-container">
				<PlaygroundsMap
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI71ndio2s7kJpHicofZyytGLd0sn3s8E&v=3"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={ <div style={{ height: `800px`, width: '800px' }} /> }
				mapElement={ <div style={{ height: `100%` }} /> }
				isMarkerShown
				/>		
				
			</div>
		);
	
	}}

export default Map