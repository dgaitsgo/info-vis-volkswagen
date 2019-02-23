import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

class App extends Component {

  componentDidMount() {

    const { token } = this.state

    axios.get("/api/countries", {
      params : {
        token
      }
    })
    .then(res => {
      
      const countries = res.countries.data
      const { token } = res

      this.setState({ countries, token })

    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (null)
  }
}

export default App
