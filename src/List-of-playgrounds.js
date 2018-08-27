import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class List extends Component {

  //Insipiration from: https://stackoverflow.com/questions/18333679/google-maps-open-info-window-after-click-on-a-link
  clickOnItem = (playground) => {
    for(let marker of this.props.markers) {
      if(marker.id === playground.id) {
        window.google.maps.event.trigger(playground, "click")}
        }
      }
    

  render () {

		return (
      
            <div id= "sidebar">
              <Link id="add-new-playground" to='/add'>
                <div id="plus-sign"></div>
                <div id="add-playground">Add new playground</div>
              </Link>
              <div id="search">
                <div id="search-sign"></div>                
                <input 
                  type="text" 
                  placeholder="Search place by City" 
                  id="search-field"
                  value={this.props.search}
                  onChange={(event) => 
                  this.props.searchAsk(event.target.value)}
                />
              </div>
                  
              <ol id="list">
                {this.props.searchedPlaygrounds.map((playground) => (
                  <li key={playground.id} 
                      onClick={event => {
                        this.clickOnItem (playground)
                      }}>
                    {playground.title} ({playground.name})
                  </li>
                  ))}
              </ol>
            </div>
		)
	}
}

export default List