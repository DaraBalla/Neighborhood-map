import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class List extends Component {

  //Insipiration from: https://stackoverflow.com/questions/18333679/google-maps-open-info-window-after-click-on-a-link
  clickOnItem = (playground) => {
    for(let marker of this.props.markers) {
      if(marker.id === playground.id) {
        window.google.maps.event.trigger(playground, "click")
      }
    }
  }

  pressEnterOnItem = (playground, event) => {
    if (event.key === 'Enter') {
      this.clickOnItem(playground)
    }
  }

  render () {
      
		return (
      
      <div className= "sidebar">
        <Link id="add-new-playground" to='/add'>
          <div id="plus-sign"></div>
          <div id="add-playground">Add new playground</div>
        </Link>
        <div id="search">
          <div id="search-sign"></div>                
          <input 
            aria-label="Search playground by city"
            role="search"
            type="text" 
            placeholder="Search place by City" 
            id="search-field"
            value={this.props.search}
            onChange={(event) => 
            this.props.searchAsk(event.target.value)}
          />
        </div>
            
        <ol id="list" aria-label="List of searched playgrounds" role="list">
          {this.props.searchedPlaygrounds.map((playground) => (
            <li 
              tabIndex="0"
              role="button"
              onKeyPress={event => {
                this.pressEnterOnItem (playground, event)
              }}
              key={playground.venue.location.labeledLatLngs.lat} 
              onClick={event => {
                this.clickOnItem (playground)
              }}
            >
              {playground.venue.name} ({playground.venue.location.city})
            </li>
          ))}
        </ol>
      </div>
		)
	}
}

export default List