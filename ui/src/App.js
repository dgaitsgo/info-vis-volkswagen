import React, { Component } from 'react'
import { Footer } from 'react-bulma-components/full';
import { Container } from 'react-bulma-components/full';
import { Content } from 'react-bulma-components/full';
import { Hero } from 'react-bulma-components/full';

import { Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'

import GraphContainer from './containers/GraphContainer'
import LandingContainer from './containers/LandingContainer'
import BrandsContainer from './containers/BrandsContainer'
import ModelsContainer from './containers/ModelsContainer'
import CompareContainer from './containers/CompareContainer'
import { withRouter } from 'react-router-dom'
import './style/app.css'

class App extends Component {

	constructor(props) {

		super(props)
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
		const urlData = this.props.location.pathname.split('/')

		const footerClass = urlData.length <= 2 && urlData[1] === '' ? '' : 'changed'
			return (
			<div className='main'>
				<Navigation />
				<Switch>
					<Route exact path='/' component={ GraphContainer } />
					<Route exact path='/explore' component= { LandingContainer } />
					<Route exact path={`/explore/:countryCode`} component={ BrandsContainer} />
					<Route exact path={`/explore/:countryCode/:brand_id`} component= { ModelsContainer } />
					<Route exact path={`/explore/:countryCode/:brand_id/:model_string`} component= { CompareContainer } />
					<Route component={ NotFound }/>
				</Switch>
				<Hero>
					<Hero.Head renderAs='header' />
						<Hero.Body />
						<Hero.Footer>
							<Footer className={footerClass}>
								<Container>
									<Content className='has-text-centered'>
											<p>
												Developed by
												<a href='https://github.com/dgaitsgo' rel='noopener noreferrer' target='_blank'> David Gaitsgory</a>,
												<a href='https://github.com/SebastianKunz' rel='noopener noreferrer' target='_blank'> Sebastian Kunz</a> and
												<a href='https://github.com/jessicaliuCW' rel='noopener noreferrer' target='_blank'> Jessica Liu</a>.
												The source code is <a href='https://bit.ly/1JWRKa9' rel='noopener noreferrer' target='_blank'>MIT</a> licensed.
												 The website's content is{' '}
												<a href='https://bit.ly/OIgYRT' rel='noopener noreferrer' target='_blank'>CC BY NC SA 4.0</a> licensed.
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

export default withRouter(App)
