import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Landing from '../components/Landing'
import Redirect from 'react-router-dom/Redirect'

const countries = {"data":[{"countryCode":"SE",
"name":"Sweden"},
{"countryCode":"PT",
"name":"Portugal"},
{"countryCode":"IT",
"name":"Italy"},
{"countryCode":"NL",
"name":"Netherlands"},
{"countryCode":"PL",
"name":"Poland"},
{"countryCode":"LU",
"name":"Luxembourg"},
{"countryCode":"LV",
"name":"Latvia"},
{"countryCode":"LT",
"name":"Lithuania"},
{"countryCode":"IE",
"name":"Ireland"},
{"countryCode":"GB",
"name":"United Kingdom"},
{"countryCode":"FR",
"name":"France"},
{"countryCode":"ES",
"name":"Spain"},
{"countryCode":"EE",
"name":"Estonia"},
{"countryCode":"DK",
"name":"Denmark"},
{"countryCode":"DE",
"name":"Germany"},
{"countryCode":"CH",
"name":"Switzerland"},
{"countryCode":"BE",
"name":"Belgium"}],
"meta":{"count":17}}

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

    // componentDidMount() {

    //     const { token } = this.props

    //     axios.get('/api/countries').then(res => {

    //         const countries = res.data.countries.data

    //         this.setState({ countries })
    //     })
    //     .catch(err => {
    //         const to = {
    //             pathname : '/server-error',
    //             query : {
    //                 err
    //             }
    //         }
    //         return (
    //             <Redirect to={to} />
    //         )
    //     })
    // }

    render() {

        // const {
        //     countries
        // } = this.state

        // if (!countries) {
        //     return (
        //         <Loader message={'Getting markets...'} />
        //     )
        // }

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