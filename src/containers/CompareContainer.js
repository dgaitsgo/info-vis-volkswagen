import React, { Component } from 'react'
import axios from 'axios'

import Modal from 'react-modal'
import { Loader, Button, Icon, Columns } from 'react-bulma-components/full'
import Description from '../components/Description'
import data from './compareData.js'
import Sidebar from '../components/Sidebar'
import BarChart from '../components/BarChart'
import Option from '../components/Option'
import ModelCard from '../components/ModelCard'
import Redirect from 'react-router-dom/Redirect'
import '../style/compareContainer.css'
import getLocalStorage from '../modules/localStorage'
import _ from 'lodash'

class CompareContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			fullModels : null,
			compareMode : 'CO2'
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

		// const urlData = this.props.location.pathname.split('/')
		// const _models = JSON.parse(urlData[3])
		// let models = Object.keys(_models).map(modelId => ({ id : modelId, name : _models[modelId] }))

		// const fullModelsRes = await axios.get('/api/configureModels', {
		// 	params : {
		// 		models,
		// 	}
		// })

		// const fullModels = {
		// 	data : fullModelsRes.data
		// }
		const fullModels = {
			data : data
		}

		this.setState({ fullModels })
	}

    // async componentDidMount() {

	// 	const urlData = this.props.location.pathname.split('/')
	// 	const models = JSON.parse(urlData[3])
	// 	let modelsArr = Object.keys(models).map(modelId => ({ id : modelId, name : models[modelId] }))

	// 	//get local stage object
	// 	const ls = getLocalStorage('vw-product-data-configs')

	// 	ls.info().then(res => {

	// 		//look at the configurations the user has in loca
	// 		ls.find({ selector : { _id : 'configs' }})
	// 			.then(async res => {

	// 				let fullModels = {}
	// 				fullModels.data = {}
	// 				fullModels.rev = 'randomfuckingstinrg'
	// 				let cachedModels = res.docs.length ? res.docs[0] : {}

	// 				//get the missing models
	// 				const missingModels = !cachedModels.data
	// 					? modelsArr
	// 					: modelsArr.filter(model => !cachedModels.data[model.id])

	// 				if (missingModels.length) {
	// 					const fullModelsRes = await axios.get('/api/configureModels', {
	// 						params : {
	// 							models : missingModels
	// 						}
	// 					})

	// 					fullModels.data = fullModelsRes.data
	// 				}

	// 				let data = _.merge(cachedModels.data, fullModels.data)
	// 				fullModels.data = data
	// 				fullModels._id = 'configs'

	// 				fullModels.rev = cachedModels ? cachedModels.rev : null
	// 				fullModels._rev = cachedModels ? cachedModels._rev : null

	// 				ls.insert(fullModels).then(_rev => {
	// 					fullModels.rev = _rev
	// 					fullModels._rev = fullModels._rev
	// 					this.setState({ fullModels })
	// 				})
	// 			})
	// 		})
	// }

	setCompareMode = compareMode => this.setState({compareMode})

	render() {

		const {
			fullModels,
			compareMode
		} = this.state

		if (!fullModels)
			return <Loader message={'Getting configurations...'} />

		return (
			<div className='compare-container-wrapper'>
				<div className='dashboard'>
					<h1>
						Model Comparison
					</h1>
					<div className='button-wrapper'>
						<div className="field">
							<span>Sort by : </span>
							<input onClick={() => this.setCompareMode('CO2')} className={'is-checkradio'} id="exampleRadioInline1" type="radio" name="exampleRadioInline" checked={compareMode === 'CO2'} />
							<label for="exampleRadioInline1">CO<sub>2</sub></label>
							<input onClick={() => this.setCompareMode('CONSUMPTION')} className="is-checkradio" id="exampleRadioInline2" type="radio" name="exampleRadioInline" checked={compareMode ==='CONSUMPTION'} />
							<label for="exampleRadioInline2">Consumption</label>
						</div>
					</div>
					<Sidebar
						fullModels={ fullModels }
						compareMode={ compareMode }
					/>
					<BarChart
						fullModels={ fullModels }
						compareMode={ compareMode }
					/>
				</div>
			</div>
		)
	}
}

export default CompareContainer
