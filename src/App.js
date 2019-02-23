import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Navigation from './components/Navigation'
import Landing from './components/Landing'
import NotFound from './components/NotFound'
import Brands from './components/Brands'

class App extends Component {

	constructor() {
		super();

		this.state = {
			modalIsOpen: true,
			selectedCountry: null,
			selectedBrand: null
		};
	}

	onClickCountry = (code) => {
		console.log(code)
		this.setState({ selectedCountry : code })
	}

	openModal = () => {
		this.setState({ modalIsOpen: true })
	}

	closeModal = () => {
		this.setState({ modalIsOpen: false })
	}

	onClickCompare = (brand) => {
		console.log("test")
		this.setState({ selectedBrand: brand})
	}

	render() {
		console.log(this.state.countryCode)
		return (
			<BrowserRouter>
				<div>
					<Navigation />
						<Switch>
							<Route exact path='/'component= { () =>
								<Landing
									onClickCountry={this.onClickCountry}
									closeModal={this.closeModal}
									openModal={this.openModal}
									modalIsOpen={this.state.modalIsOpen}
								/>} />
							<Route path='/:countryCode/brands' component={ () =>
								<Brands
									countryCode={this.state.countryCode}
									onClickCompare={this.onClickCompare}
								/>} />
							<Route component={ NotFound }/>
						</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

export default App
