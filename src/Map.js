import React, { Component } from 'react'



class Map extends Component {

	render = () => {
		
		//searchedPlaygrounds = this.props.searchedPlaygroundsFromList
		console.log(this.props.places)
		//console.log(searchedPlaygrounds)

		return(
			<div id="map-container">
				<div id="map"> 

				</div>
			</div>
		);
	}
}



export default Map