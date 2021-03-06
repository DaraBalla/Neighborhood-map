import React, { Component } from 'react'


class List extends Component {

  state = {
    query: ''
  }

  //Insipiration from: https://stackoverflow.com/questions/18333679/google-maps-open-info-window-after-click-on-a-link
  clickOnItem = (playground) => {
    
     for(let marker of this.props.markers) {
      if(marker.id === playground.venue.location.lat) {
        window.google.maps.event.trigger(marker, "click")
      }
    } 
  }

  pressEnterOnItem = (playground, event) => {
    if (event.key === 'Enter') {
      this.clickOnItem(playground)
    }
  }

  onChangeInput = (event) => {
    this.setState({
      query: event.target.value
    })

    this.props.filterList(event.target.value)
  }

  render () {
      
		return (
      
      <div className= "sidebar">
        
        <div id="search">
          <div id="search-sign"></div>                
          <input 
            aria-label="Search playground by city"
            role="search"
            type="text" 
            placeholder="Search place by City" 
            id="search-field"
            value={this.state.query}
            onChange={this.onChangeInput}
          />
        </div>
            
        <ol id="list" aria-label="List of searched playgrounds" role="list">
          {this.props.searchedPlaygrounds.map((playground) => (
            <li 
              tabIndex="0"
              role="button"
              key={playground.venue.name} 
              onKeyPress={event => {
                this.pressEnterOnItem (playground, event)
              }}              
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