import React, { Component } from 'react'
import axios from 'axios'

import Modal from 'react-modal'
import { Loader, Button, Icon, Columns, Section, Heading, Box } from 'react-bulma-components/full'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import "react-tabs/style/react-tabs.css"

import Description from '../components/Description'
import data from './compareData.js'
import optionsData from './compareOptionsData.js'
import Sidebar from '../components/Sidebar'
import BarChart from '../components/BarChart'
import Option from '../components/Option'
import ModelCard from '../components/ModelCard'
import Redirect from 'react-router-dom/Redirect'
import getLocalStorage from '../modules/localStorage'
import _ from 'lodash'

import '../style/compareContainer.css'
import compareData from './compareData.js';

class CompareContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			fullModels : null,
			compareMode : 'CO2',
			modalIsOpen: false,
			modalContent: {},
			modelOptions: optionsData
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
		const allTypes = []

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

	closeModal = () => this.setState({ modalIsOpen: false })

	openModal = ({ model_id, model_name, typeName, typeId }) => {
		this.setState({ modalIsOpen: true,
			modalContent: {
				model_name,
				type: {
					name: typeName,
					id: typeId
				}
			} })
	}

	render() {

		const {
			fullModels,
			compareMode,
			modalIsOpen,
			modalContent,
			modelOptions
		} = this.state

		// const categories = modelOptions.data.filter( (option, i) => modelOptions.data.indexOf(option) === i)
		const categoriesWithDups = modelOptions.data.map( option => option.category)
		const onlyCategories = [...new Set(categoriesWithDups)]

		if (!fullModels)
			return <Loader message={'Getting configurations...'} />
		return (
			<div className='compare-container-wrapper'>
				<div className='dashboard'>
					<Heading size={4} className='has-text-centered'>
						Model Comparison
					</Heading>
					<div className='button-wrapper'>
						<div className="field">
							<span>Sort by: </span>
							<input
								onClick={() => this.setCompareMode('CO2')}
								className={'is-checkradio'}
								id="exampleRadioInline1"
								type="radio"
								name="exampleRadioInline"
								checked={compareMode === 'CO2'}
							/>
							<label for="exampleRadioInline1">CO<sub>2</sub></label>
							<input
								onClick={() => this.setCompareMode('CONSUMPTION')}
								className="is-checkradio"
								id="exampleRadioInline2"
								type="radio"
								name="exampleRadioInline"
								checked={compareMode ==='CONSUMPTION'} />
							<label for="exampleRadioInline2">Consumption</label>
						</div>
					</div>
					<Sidebar
						fullModels={ fullModels }
						compareMode={ compareMode }
						openModal= { this.openModal }
					/>
					<BarChart
						fullModels={ fullModels }
						compareMode={ compareMode }
					/>
					<Modal
						isOpen={modalIsOpen}
						onRequestClose={this.closeModal}
					>
						<Heading size={4} className='has-text-centered'>
							Configure Your {modalContent.model_name}
						</Heading>
						<Heading size={4} className='has-text-centered'>
							{/* {modalContent.type.name} */}
						</Heading>
							<div className='tree-wrapper'>
								<div className='tree-category-wrapper'>
									{onlyCategories.map( (category, i) => <Box key={i}>{category} </Box> ) }
								</div>
								<div className='tree-options-wrapper'>
									this is my option
								</div>
							</div>

					</Modal>

				</div>
			</div>
		)
	}
}

export default CompareContainer
