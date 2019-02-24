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
import LandingContainer from './containers/LandingContainer'
import BrandsContainer from './containers/BrandsContainer'
import NotFound from './components/NotFound'


class App extends Component {

	constructor() {

		super()

		this.state = {
			modalIsOpen: true,
			selectedCountry: {
				name: null,
				code: null
			},
			countries : null,
			token : null,
			nav: null
		}
	}

	render() {
		// console.log(this.props)
		return (
			<div className="main">
				<Navigation />
				<Switch>
					<Route exact path='/' component= { LandingContainer } />
					<Route path={`/:countryCode/brands`} component={ BrandsContainer} />
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
												<strong>this made</strong> by David, Sebastian, <a href="#">Jessica</a>. The source code is licensed
												<a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content is licensed{' '}
												<a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
											</p>
									</Content>
								</Container>
							</Footer>
						</Hero.Footer>
					</Hero>
				</div>
		)
	}
}

export default App
