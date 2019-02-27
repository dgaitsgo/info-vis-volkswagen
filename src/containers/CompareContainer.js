import React, { Component } from 'react'
import axios from 'axios'

import Modal from 'react-modal'
import { Loader } from 'react-bulma-components/full'
import Description from '../components/Description'
import data from './compareData.js'
import Sidebar from '../components/Sidebar'
import Option from '../components/Option'
import ModelCard from '../components/ModelCard'
import { Button } from "react-bulma-components/full"
import _ from 'lodash'

import Redirect from 'react-router-dom/Redirect'

/*
Getting:
	Name of car
		-All the default options
			-Description
			-id
*/

const sum = (accumulator, currentValue) => accumulator + currentValue

const average = array => array.reduce(sum) / array.length

class CompareContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			fullModels : data,
			compareMode : 'CO2'
		}
	}

	getChoices = (configId) => {
//		const urlData = this.props.location.pathname.split('/')
//		const models = JSON.parse(urlData[3])
//		const configurationIds = this.props.location.params.configurationIds
//


//		Promise.all(configurationIds.map(configId =>
//			axios.get('/api/choices', {
//				params : {
//					configurationId : configId
//				}
//		 })
//		)).then(results => {
//
//			let fullModels = []
//
//			results.forEach( (res, i) => {
//				fullModels.push({
//					//get : model.id, model.name
//					model : models[i],
//					configId : configurationIds[i],
//					options : res.data
//				})
//			})
//
//			console.log(fullModels)
//
//			this.setState({ fullModels })
//
//		 })
//		 .catch(err => {
//		 	const to = {
//		 		pathname : '/server-error',
//		 		query : {
//		 			err
//		 		}
//		 	}
//		 	return (
//		 		<Redirect to={to} />
//		 	)
//		 })
//    }

	}

    componentDidMount() {

		const urlData = this.props.location.pathname.split('/')
		const models = JSON.parse(urlData[3])
		// const configurationIds = this.props.location.params.configurationIds

		// configurationIds
		// axios.get('/api/configureModels', {
		// 	params : {
		// 		models
		// 	}
		// }).then(results => {

		// 	console.log(results.data)
		// 	this.setState({ configurations : results.data })
		// })
	}

	setCompareMode = compareMode => this.setState({compareMode})

	rankModels = () => {

		const { fullModels, compareMode } = this.state
		console.log('compare mode ', compareMode)
		const averageModelMap = Object.keys(fullModels).map( (modelId, i) => {

			const model = fullModels[modelId]
			if (model.wltp.data.length) {

				const currentInterps = model.wltp.data[0].interpolations.filter(interp => interp.value_type === compareMode)
				console.log('current interps', currentInterps)
				const interpAverage = average(currentInterps.map( item => item.value ))

				return ({
					modelId,
					average: interpAverage
				})
			}

			return null
		}).filter(val => val)

		_.sortBy(averageModelMap, 'average').reverse()

		return (averageModelMap)
	}

	render() {

		const {
			fullModels
		} = this.state

		const rankedModels = this.rankModels()
		const modelElems = rankedModels.map( (rankedModel, i) => {

			const currModel = fullModels[rankedModel.modelId]

		 	return (
		 		<div className='compare-model-wrapper' key={i}>
		 			<div className='compare-model-name-wrapper'>
		 				<span className='compare-model-name'>
		 					{`${i + 1}. ${currModel.model.name } `}
		 				</span>
						<span className='compare-model-value'>
						{ rankedModel.average }
						</span>
		 			</div>
		 		</div>
		 	)
		})

		// if (!fullModels) {
		// 	return (<Loader message="getting choices... "/> )
		// }

		return (
			<div className='compare-container-wrapper'>
			<div>
				<Button onClick={() => this.setCompareMode('CO2')}>CO2</Button>
				<Button onClick={() => this.setCompareMode('CONSUMPTION')}>Consumption</Button>
			</div>
				{modelElems}
			</div>
		)
	}
}


export default CompareContainer

// {/* foreach Selected Model: */}
// <div> NAME </div>
// <div className='cutomise-wrapper' onClick={() => {
// 	console.log(this.state.openModals)
// 	console.log("click")
// 		this.setState(this.openModals[{name:'RS 5'}]=true)
// 	}}>
// 	Customise Button
// 	<Modal
// 		isOpen={this.state.openModals[{name:'RS 5'}]}
// 	/>
// </div>

