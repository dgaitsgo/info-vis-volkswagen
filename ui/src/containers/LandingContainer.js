import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Landing from '../components/Landing'
import Redirect from 'react-router-dom/Redirect'

class LandingContainer extends Component {

	constructor(props) {

		super(props)

		this.state = {
			modalIsOpen: false,

			//all the countries of OKAPI
			countries : null
		}
	}
	openModal = () => this.setState({ modalIsOpen: true })

	closeModal = () => this.setState({ modalIsOpen: false })

	componentDidMount() {

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
			return (
				<Redirect to={to} />
			)
		})
	}

	render() {

		const { countries } = this.state

		if (!countries) {
			return (
				<div className="loaders">
				<Loader
					style={{
						borderTopColor: 'transparent',
						boderRightColor: 'transparent',
					}}
				message={'Getting markets...'} />
				</div>
			)
		}

		return (
			<Landing
				onClickCountry={this.onClickCountry}
				toggleModal={this.toggleModal}
				openModal={this.openModal}
				closeModal={this.closeModal}
				modalIsOpen={this.state.modalIsOpen}
				countries={countries}
			/>
		)
	}
}

export default LandingContainer
