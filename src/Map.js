import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

let searchedPlaygrounds

class Map extends Component {
	
	state = {
		activeMarker: {},
		showInfo: false,
		selectedPlace: {}
	}

	onClickMarker = (props, marker, e) => {
		this.setState({ 
			showInfo: true,
			activeMarker: marker,
			selectedPlace: props	
		 })
	}

	render() {
		
		searchedPlaygrounds = this.props.searchedPlaygroundsFromList


		const PlaygroundsMap = withScriptjs(withGoogleMap(props => (
			<GoogleMap
				defaultCenter = { { lat: 49.936089, lng: 17.973804 } }
				defaultZoom = { 13 }
			>
				{searchedPlaygrounds.map((marker, index) =>
					<Marker 
						key={index}	
						position={{ lat: marker.lat, lng: marker.lng }}
						onClick={this.onClickMarker}
					>
						{marker.showInfo && (
							<InfoWindow
								visible={this.state.showInfo}
								marker={this.state.activeMarker}
								
							>
								<div>
									<h1>{marker.address}</h1>					
								</div>
							</InfoWindow> 
						)}
					</Marker> 
				)}
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