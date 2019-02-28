import React, { Component } from 'react'
import axios from 'axios'

import Modal from 'react-modal'
import { Loader, Button, Icon } from 'react-bulma-components/full'
import Description from '../components/Description'
import data from './compareData.js'
import Sidebar from '../components/Sidebar'
import Option from '../components/Option'
import ModelCard from '../components/ModelCard'
import ReactD3 from 'react-d3-components'
import Redirect from 'react-router-dom/Redirect'

import getLocalStorage from '../modules/localStorage'
import _ from 'lodash'

import { Bar } from 'react-chartjs-2'


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

		const urlData = this.props.location.pathname.split('/')
		const _models = JSON.parse(urlData[3])
		let models = Object.keys(_models).map(modelId => ({ id : modelId, name : _models[modelId] }))

		const fullModelsRes = await axios.get('/api/configureModels', {
			params : {
				models,
			}
		})

		const fullModels = {
			data : fullModelsRes.data
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

	getInterpolations = ({ fullModels, phase, compareMode}) => {

		return Object.keys(fullModels.data).map( (modelId, i) => {

			const model = fullModels.data[modelId]

			if (model.wltp.data.length) {

				const currentInterps = model.wltp.data[0].interpolations
					.filter(interp => interp.value_type === compareMode && interp.phase == phase)
					.map( interp => interp.value)

					return ({
						value: currentInterps,
						name: model.model.name
					})
			}
			else{
				return ({
					value: null,
					name: model.model.name
				})
			}

		})
	}

	transformToDataSet = ({ low, med, high, extra }) => {
		return (
			{
				labels: low.filter(({ value }) => value && value.length).map(({ name }) => name),
				datasets: [{
					data: low.map( ({ value }) => value),
					label:"Low",
					backgroundColor:"#4caf50",
					borderColor:"#43a047",
					borderWidth:1,
					hoverBackgroundColor:"#81c784",
					hoverBorderColor:"#66bb6a"
				},
				{
					data: med.map(({ value }) => value),
					label: 'Medium',
					backgroundColor:"#ffeb3b",
					borderColor:"#fdd835",
					borderWidth:1,
					hoverBackgroundColor:"#fff176",
					hoverBorderColor:"#ffee58"
				},
				{
					data: high.map(({ value }) => value),
					label: 'High',
					backgroundColor:"#ff9800",
					borderColor:"#fb8c00",
					borderWidth:1,
					hoverBackgroundColor:"#ffb74d",
					hoverBorderColor:"#ffa726"
				},
				{
					data: extra.map(({ value }) => value),
					label: 'Extra',
					backgroundColor:"#f44336",
					borderColor:"#e53935",
					borderWidth:1,
					hoverBackgroundColor:"#e57373",
					hoverBorderColor:"#ef5350"
				},
			]
			}
		)
	}

	render() {

		const {
			fullModels,
			compareMode
		} = this.state

		if (!fullModels)
			return <Loader message={'Getting configurations...'} />

		const lowEmissions = this.getInterpolations({ fullModels, compareMode, phase:'LOW' })
		const medEmissions = this.getInterpolations({ fullModels, compareMode, phase:'MEDIUM' })
		const highEmissions = this.getInterpolations({ fullModels, compareMode, phase:'HIGH' })
		const extraHighEmissions = this.getInterpolations({ fullModels, compareMode, phase:'EXTRA_HIGH' })

		const dataSet = this.transformToDataSet({ low: lowEmissions, med: medEmissions, high: highEmissions, extra: extraHighEmissions })

		return (
			<div className='compare-container-wrapper'>
			<div>
				Sort by
				<Button onClick={() => this.setCompareMode('CO2')}>CO2</Button>
				<Button onClick={() => this.setCompareMode('CONSUMPTION')}>Consumption</Button>
			</div>
				<Sidebar
					fullModels={ fullModels }
					compareMode={ compareMode }
				/>
				<Bar
					data={dataSet}
				/>
			</div>
		)
	}
}

export default CompareContainer
