import React, { Component } from 'react'

class Header extends Component {
		
	render() {
    return (
			<header className="App-header">
            
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
				
      </header>
		)
  }
}


export default Header