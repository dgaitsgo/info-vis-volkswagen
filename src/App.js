import React, { Component } from 'react'
import './App.css'
import { Heading } from "react-bulma-components/full" 
import { Image } from "react-bulma-components/full"
import { Icon } from "react-bulma-components/full"

import { Footer } from 'react-bulma-components/full';
import { Container } from 'react-bulma-components/full';
import { Content } from 'react-bulma-components/full';
import { Hero } from 'react-bulma-components/full';


import axios from 'axios'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Navigation from './components/Navigation'
import Landing from './components/Landing'
import NotFound from './components/NotFound'
import Brands from './components/Brands'

class App extends Component {

	constructor() {
		super()

		this.state = {
			modalIsOpen: true,
			selectedCountry: null,
      selectedBrand: null,
      countries : null,
      token : null
		}
  }

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

	onClickCountry = (code) => {
		this.setState({ selectedCountry : code })
	}

	openModal = () => {
		this.setState({ modalIsOpen: true })
	}

	closeModal = () => {
		this.setState({ modalIsOpen: false })
	}

	onClickCompare = (brand) => {
		this.setState({ selectedBrand: brand})
	}

	render() {
		console.log(this.state.countryCode)
		return (
			<BrowserRouter>
			<div className="main">
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
						<Hero size="fullheight">
							<Hero.Head renderAs="header" />
							<Hero.Body />
							<Hero.Footer>
								<Footer>
									<Container>
										<Content className='has-text-centered'>
											<p>
												<strong>this made</strong> by David, Sebatian, <a href="#">Jessica</a>. The source code is licensed
												<a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content is licensed{' '}
												<a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
											</p>
										</Content>
									</Container>
								</Footer>
							</Hero.Footer>
						</Hero>
				</div>
			</BrowserRouter>
		)
	}
}

export default App
