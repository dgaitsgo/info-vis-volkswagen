import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Navigation from './components/Navigation'
import LandingContainer from './containers/LandingContainer'
import NotFound from './components/NotFound'
import Brands from './components/Brands'

class App extends Component {

	constructor() {
		super()

		this.state = {
			selectedCountry: null,
      selectedBrand: null,
      countries : null,
      token : null
		}
  }

	onClickCountry = (code) => {
		this.setState({ selectedCountry : code })
	}

	onClickCompare = (brand) => {
		this.setState({ selectedBrand: brand})
	}

	render() {

    const { 
			countries,
			selected,
			hovering
    } = this.state

		return (
			 <BrowserRouter>
			 		<Navigation />
			 			<Switch>
			 				<Route exact path='/'component= {<LandingContainer />} />
			 				<Route path='/:countryCode/brands' component={ () =>
			 					<Brands
			 						countryCode={this.state.countryCode}
			 						onClickCompare={this.onClickCompare}
			 					/>} />
			 				<Route component={ NotFound }/>
			 			</Switch>
			 </BrowserRouter>
		)
	}
}

export default App
