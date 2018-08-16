import React, { Component } from 'react'
import List from './List-of-playgrounds'
import Header from './Header';
import Map from './Map';

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

	/*initMap() {
		var map;
		map = new window.google.maps.Map(document.getElementById('map'), {
			center: {lat: 40, lng: -73},
			zoom: 13
		})
		}*/

	render () {
		return (
			<div className="mainPage">
				 <Header/>
			
				<div id="main">

					<div id="sideBar">
						<List playgrounds={this.state.playgroundsDetail}/>            
					</div>
		
					<Map/>
		
				</div>
			</div>          
		)
	}
}

export default MainPage