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
			models: null,
			selectedModels: {}
        }
	}

    componentDidMount() {

		const urlData = this.props.location.pathname.split('/')

        axios.get('/api/models', {
            params : {
                countryCode: urlData[1],
                brand_id : urlData[2]
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

	onClickModel = id => {

		let { selectedModels } = this.state

		id in selectedModels
		? delete selectedModels[id]
		: selectedModels[id] = true

		this.setState({ selectedModels })
	}

    render() {

		const urlData = this.props.location.pathname.split('/')

		const {
			models,
			selectedModels
        } = this.state

        if (!models) {
            return (
                <Loader message={'Getting models...'} />
            )
		}

		const compareButtonClassName = selectedModels
			? 'compare-button active'
			: 'compare-button'

        return (
			<div className='models-wrapper'>
				<div className='models-header'>
					Select Models
				</div>
				<div className='models-body'>
					{models.map(({ id, name }, i) => {
						return (
							<Model key= { id }
								id={ id }
								name={ name }
								onClick= {this.onClickModel}
								selected={selectedModels[id]}
							/>
						)
					})}
				</div>
				<div className={compareButtonClassName}>
					<NavLink to={{
							pathname : `${this.props.location.pathname}/${JSON.stringify(selectedModels)}`
						}
					}>
						Compare selected Models
					</NavLink>
				</div>
			</div>
        )
    }
}

export default ModelsContainer