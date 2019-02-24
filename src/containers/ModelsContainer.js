import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Landing from '../components/Landing'
import Redirect from 'react-router-dom/Redirect'
import Models from '../components/Models'

class ModelsContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			models : null,
			selectedModels : []
        }
	}

    componentDidMount() {

        const {
            brand,
            countryCode
        } = this.props.location.query

        axios.get('/api/models', {
            params : {
                countryCode, 
                brand_id : brand.brand_id
            }
        })
        .then( res => {
            const models = res.data.models.data
            this.setState({ models })
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
            models
        } = this.state

        if (!models) {
            return (
                <Loader message={'Getting models...'} />
            )
        }

        return (
            <Models
				onChange={ this.onChange }
				onAction={ this.onAction }
				onNodeToggle= {this.onNodeToggle }
				models={models}
            />
        )
    }
}

export default ModelsContainer 