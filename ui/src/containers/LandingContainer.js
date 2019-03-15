import React, { Component } from 'react'
import axios from 'axios'
import { Loader, Heading } from 'react-bulma-components/full'
import Landing from '../components/Landing'
import Redirect from 'react-router-dom/Redirect'

class LandingContainer extends Component {

	constructor(props) {

		super(props)

		this.state = {
			//all the countries of OKAPI
			countries : null
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0)

		axios.get('/api/countries').then(res => {
			let countries = res.data.countries.data
			countries.sort( (a, b) => a.name > b.name ? 1 : -1 )
			this.setState({ countries })
		})
		.catch(err => {
			const to = {
				pathname : '/server-error',
				query : {
					err
				}
			}
			return <Redirect to={to} />
		})
	}

	render() {

		const { countries } = this.state

		if (!countries) {
			return (
				<div className='loaders'>
					<Loader
						style={{
							borderTopColor: 'transparent',
							boderRightColor: 'transparent',
						}}
					/>
					<Heading className='loader-msg' size={4}>Getting Markets...</Heading>
				</div>
			)
		}

		return (
			<Landing
				countries={countries}
			/>
		)
	}
}

export default LandingContainer
