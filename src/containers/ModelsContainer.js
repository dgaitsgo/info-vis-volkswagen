import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Landing from '../components/Landing'
import Redirect from 'react-router-dom/Redirect'
import Model from '../components/Model'
import { NavLink } from 'react-router-dom'

class ModelsContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			models : null,
        }
	}

    componentDidMount() {

		const urlData = this.props.location.pathname.split('/')
		console.log(urlData)

        axios.get('/api/models', {
            params : {
                countryCode: urlData[1],
                brand_id : urlData[3]
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

		const urlData = this.props.location.pathname.split('/')

		const {
            models
        } = this.state

        if (!models) {
            return (
                <Loader message={'Getting models...'} />
            )
		}

		console.log(models)

        return (
			<div>
				{models.map(({ id, name }, i) => {
					return (
							<Model key= { id }
								id={ id }
								name={ name }
							/>
					)
				})}
			</div>
        )
    }
}

export default ModelsContainer