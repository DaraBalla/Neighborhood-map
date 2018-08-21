import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class List extends Component {

  render () {

    /* Pro přehlednost pak zaměnit:
        const { search } = this.state
        const { playgrounds } = this.props */
    
    let searchedPlaygrounds = this.props.searchedPlaygroundsFromList

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
                  this.searchAsk(event.target.value)}
                />
              </div>
                  {/*{JSON.stringify(this.state.search)}*/}

              <ol id="list">
                {searchedPlaygrounds.map((playground) => (
                  <li key={playground.lng}>
                    {playground.city}, {playground.address}
                  </li>
                  ))}
              </ol>
            </div>
		)
	}
}

export default List