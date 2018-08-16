import React, { Component } from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'



class Map extends Component {
	render() {
		const PlaygroundsMap = withGoogleMap(props => (
			<GoogleMap
				defaultCenter = { { lat: 49.936089, lng: 17.973804 } }
				defaultZoom = { 13 }
			>
			</GoogleMap>
		))
		
		return(
			<div>
				<PlaygroundsMap
				containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
				mapElement={ <div style={{ height: `100%` }} /> }
				/>		
				
			</div>
		);
	}}

export default Map