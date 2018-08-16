import React, { Component } from 'react'
import { Link } from 'react-router-dom'
/*import serializeForm from 'form-serialize'*/

class NewPlayground extends Component {
  
  createPlayground = (event) => {
    event.preventDefault()
    /*const url = serializeForm(event.target, { hash: true })
    if (this.props.onAddingPlayground(url)) { 
            this.props.onAddingPlayground(url)
      }
            -viz "Finishing the Contact form"

      ---toto zadat až po vytvoření API souboru s playgrounds 
      a vytvoření fce jako createContact (v App.js):

      createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  Pak upravit v App.js:

  <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )}/>



    */
  }
  
  
  render () {
        return (
            <div>
                <Link className="close-button" to="/">X</Link>
                <form className="create-new-playground" onSubmit={this.createPlayground}>
                  <input type="text" name="City" placeholder="City"/>
                  <input type="text" name="Street" placeholder="Street"/>
                  <button className="adding-playground">Add new playground</button>
                </form>
            </div>
        )
    }
}

export default NewPlayground