import React, { Component } from 'react'
import ReactPropTypes from 'prop-types'


class List extends Component {
  static ReactPropTypes = {
    playgroundsDetail: ReactPropTypes.array.isRequired
  }
  
  render () {

    let searchedPlaygrounds

    if (this.state.search) {
      const result = new RegExp(escapeRegExp(this.state.search), 'i')
      searchedPlaygrounds = this.props.playgrounds.filter(() => result.test(playground.address))

    } else {
      searchedPlaygrounds = this.props.playgroundsDetail
    }

		return (
      <ol className="ListOfPG">
        {this.props.searchedPlaygrounds.map((playground) => 
          <li key={playground.address}>
            {playground.city}, {playground.address}
          </li>
          )}
      </ol>
		)
	}
}

export default List