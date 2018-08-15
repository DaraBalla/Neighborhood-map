import React, { Component } from 'react'
import List from './List-of-playgrounds'
import Header from './Header';

class MainPage extends Component {

	state = {
    playgroundsDetail: [
      {
        "city": "Velke Hostice",
        "address": "Zamecka 85",
        "equipment": []
      },
      {
        "city": "Velke Hostice",
        "address": "Akatova 40",
        "equipment": []
      },
      {
        "city": "Velke Hostice",
        "address": "Mirova 22",
        "equipment": []
      },
      {
        "city": "Kravare",
        "address": "Kostelni 152",
        "equipment": []
      },
      {
        "city": "Chlebicov",
        "address": "Hlavni 47",
        "equipment": []
      }
    ]    
  }

	render () {
		return (
			<div className="mainPage">
				 <Header/>
			
				<div id="main">

					<div id="sideBar">
						<List playgrounds={this.state.playgroundsDetail}/>            
					</div>
		
					<div id="map">
						<p>map</p>
							{/* function initMap() {
								var map;
								map = new google.maps.Map(document.getElementById('map'), {
									center: {lat: 40, lng: -73},
									zoom: 13
								})
								} */}
					
						<script async defer
							src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI71ndio2s7kJpHicofZyytGLd0sn3s8E&v=3&callback=initMap">
						</script>

					</div>
		
				</div>
			</div>          
		)
	}
}

export default MainPage