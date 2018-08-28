import React, { Component } from 'react'

class Header extends Component {
	
	showMenu = () => {
		document.querySelector('.hamb-menu').classList.toggle('show-menu')
		document.querySelector('.sidebar').classList.toggle('show-sidebar')
		
	}


	render() {
    return (
			<header className="App-header">
           		<img 
					src={require("./img/activity-feed-128_b.png")} 
					className="hamb-menu" alt="menu"
					onClick={event => {this.showMenu()}} 
				/>
				<div id="firstLine">

					

					<img 
						src={require("./img/play1.PNG")} 
						className="App-logo" alt="logo" 
					/>

					<h1 className="App-title">
						Neighborhood map of playgrounds
					</h1>

				</div>

				<p className="App-intro">
					Let's start to discover amazing places for your children! 
				</p>
				<p className="FSQ-declaration">*All data are from the Foursquare API*</p>
				
      </header>
		)
  }
}


export default Header