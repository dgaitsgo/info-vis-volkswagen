import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Landing from '../components/Landing'
import Redirect from 'react-router-dom/Redirect'

class LandingContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
            modalIsOpen: true,
            countries : null
        }
    }

	openModal = () => {
		this.setState({ modalIsOpen: true })
	}

	closeModal = () => {
		this.setState({ modalIsOpen: false })
	}

    componentDidMount() {

        const { token } = this.props

        axios.get('/api/countries').then(res => {

            const countries = res.data.countries.data

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

        const {
            countries
        } = this.state

        if (!countries) {
            return (
                <Loader message={'Getting markets...'} />
            )
        }

        return (
            <Landing
                onClickCountry={this.onClickCountry}
                toggleModal={this.toggleModal}
                openModal={this.openModal}
                closeModal={this.closeModal}
                modalIsOpen={this.state.modalIsOpen}
            />
        )
    }
}

export default LandingContainer