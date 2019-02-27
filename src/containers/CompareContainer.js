import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Description from '../components/Description'
import Sidebar from '../components/Sidebar'
import Option from '../components/Option'
import Redirect from 'react-router-dom/Redirect'
import getLocalStorage from '../modules/localStorage'
import _ from 'lodash'

class CompareContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			fullModels : null
		}
	}

	//getChoices = (configId) => {

	//	const urlData = this.props.location.pathname.split('/')
	//	const models = JSON.parse(urlData[3])
	//	const configurationIds = this.props.location.params.configurationIds

	//	Promise.all(configurationIds.map(configId =>
	//		axios.get('/api/choices', {
	//			params : {
	//				configurationId : configId
	//			}
	//	 })
	//	)).then(results => {
	//		 
	//		let fullModels = []

	//		results.forEach( (res, i) => {
	//			fullModels.push({
	//				//get : model.id, model.name
	//				model : models[i],
	//				configId : configurationIds[i],
	//				options : res.data
	//			})
	//		})

	//		console.log(fullModels)

	//		this.setState({ fullModels })

	//	 })
	//	 .catch(err => {
	//	 	const to = {
	//	 		pathname : '/server-error',
	//	 		query : {
	//	 			err
	//	 		}
	//	 	}
	//	 	return (
	//	 		<Redirect to={to} />
	//	 	)
	//	 })
	//}
	
	checkBuild = () => {
		//to do 
	}

	saveToLocal = () => {
		
		// todo
		// fullModels.
	}

    async componentDidMount() {

		const urlData = this.props.location.pathname.split('/')
		const models = JSON.parse(urlData[3])
		let modelsArr = Object.keys(models).map(modelId => ({ id : modelId, name : models[modelId] }))
		console.log('looking for models', models)

		//get local stage object
		const ls = getLocalStorage('vw-product-data-configs')

		ls.info().then(res => {

			//look at the configurations the user has in loca
			ls.find({ selector : { _id : 'configs' }})
				.then(async res => {
					
					let fullModels = {}
					let cachedModels = res.docs.length ? res.docs[0] : {}
					
					console.log('cached models', cachedModels)
					//get the missing models
					const missingModels = modelsArr.filter(model => !cachedModels[model.id])	

					console.log('missing models', missingModels)
					
					if (missingModels.length) {
						const fullModelsRes = await axios.get('/api/configureModels', {
							params : {
								models : missingModels
							}
						})

						fullModels = fullModelsRes.data

						console.log('missing model results', fullModels)
					}
						
					fullModels = _.merge(cachedModels, fullModels)
					fullModels._id = 'configs'

					console.log('final fall models', fullModels)
						
					ls.insert(fullModels).then(_rev => {
						fullModels._rev = _rev
						this.setState({ fullModels })
					})
				})
		})
	}

	render() {

		const {
			fullModels
		} = this.state

		if (!fullModels) {
			return (<Loader message="getting options... "/> )
		}

		console.log(fullModels)

		return (
			null
		)
	}
}

export default CompareContainer