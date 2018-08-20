import React, { Component } from 'react'
import List from './List-of-playgrounds'
import Header from './Header';


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
  }
  
  render () {
    
    return (
      <div className="mainPage">
				 <Header/>
			
				<div id="main">
          
					<div id="sideBar">
						<List playgrounds={this.state.playgroundsDetail}/>            
					</div>
		
					
		
				</div>
			</div>          
		)
	}
}

export default MainPage