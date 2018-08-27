import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class List extends Component {

  clickOnItem = (playground) => {
    for(let marker of this.props.markers) {
      if(marker.id = playground.id) {
        window.google.maps.event.trigger(playground, "click")}

        /*playground.addListener('click', function() {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(function(){
              marker.setAnimation(null)}, 200)
          this.props.infowindow.setContent(playground.city),
          this.props.infowindow.open(this.props.map, this.props.marker)*/
        }
      }
    



  render () {

    /* Pro přehlednost pak zaměnit:
        const { search } = this.state
        const { playgrounds } = this.props */
    
    
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
                  {/*{JSON.stringify(this.state.search)}*/}

              <ol id="list">
                {this.props.searchedPlaygrounds.map((playground) => (
                  <li key={playground.lng} 
                      onClick={event => {
                        this.clickOnItem (playground)
                      }}>
                    {playground.title}
                  </li>
                  ))}
              </ol>
            </div>
		)
	}
}

export default List