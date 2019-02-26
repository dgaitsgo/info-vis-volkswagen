import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Description from '../components/Description'
import Sidebar from '../components/Sidebar'
import Option from '../components/Option'
import Redirect from 'react-router-dom/Redirect'

class CompareContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			fullModels : null
		}
	}

    componentDidMount() {

		const urlData = this.props.location.pathname.split('/')
		const models = JSON.parse(urlData[3])
		const configurationIds = this.props.location.params.configurationIds
		
		Promise.all(configurationIds.map(configId =>
			axios.get('/api/choices', {
				params : {
					configurationId : configId
				}
		 })
		)).then(results => {
			 
			let fullModels = []

			results.forEach( (res, i) => {
				fullModels.push({
					//get : model.id, model.name
					model : models[i],
					configId : configurationIds[i],
					options : res.data
				})
			})

			console.log(fullModels)

			this.setState({ fullModels })

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
			fullModels			
		} = this.state

		if (!fullModels) {
			return (<Loader message="getting options... "/> )
		}

		return (
			<div className='compare-container-wrapper'>
				{ fullModels.map( (model, key) =>
					<div key={`compare-${key}`} className='compare-model-wrapper'>
						{ JSON.stringify(model.options)}
					</div>
				)}				
			</div>
		)
	}
}

export default CompareContainer
