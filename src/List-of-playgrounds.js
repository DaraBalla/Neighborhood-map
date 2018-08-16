import React, { Component } from 'react'
import ReactPropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'


class List extends Component {
  static ReactPropTypes = {
    playgroundsDetail: ReactPropTypes.array.isRequired
  }

  state = {
    search: ''
  }
  
  searchAsk = (ask) => {
    this.setState({
      search: ask.trim()
    })
  }

  render () {

    /* Pro přehlednost pak zaměnit:
        const { search } = this.state
        const { playgrounds } = this.props */
    
    let searchedPlaygrounds

    if (this.state.search) {
      const result = new RegExp(escapeRegExp(this.state.search), 'i')
      searchedPlaygrounds = this.props.playgrounds.filter((playground) => result.test(playground.city))
      searchedPlaygrounds.sort(sortBy('address'))
    } else {
      searchedPlaygrounds = this.props.playgrounds
      searchedPlaygrounds.sort(sortBy('city'))
    }

    

		return (
      
            <div id= "list">
              <Link className="add-new-playground" to='/add'>
                <div className='plus-sign'></div>
                <div className='add-playground'>Add new playground</div>
              </Link>
              <div className='search-field'>
                <div className='search-sign'></div>                
                <input 
                  type="text" 
                  placeholder="Search place by City" 
                  id="searchField"
                  value={this.state.search}
                  onChange={(event) => 
                  this.searchAsk(event.target.value)}
                />
              </div>
                  {/*{JSON.stringify(this.state.search)}*/}

              <ol className="ListOfPG">
                {searchedPlaygrounds.map((playground) => (
                  <li key={playground.address}>
                    {playground.city}, {playground.address}
                  </li>
                  ))}
              </ol>
            </div>
      
      
      
		)
	}
}

export default List