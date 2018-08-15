import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class NewPlayground extends Component {
    render () {
        return (
            <div>
                <button>
                <Link className="closeButton" to="/">X</Link></button>
            </div>
        )
    }
}

export default NewPlayground