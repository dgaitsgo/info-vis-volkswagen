import React, { Component } from 'react'
import _ from 'lodash'
import { Box, Button, Icon, Card, Heading, Media, Image } from 'react-bulma-components/full'

import '../style/dashboard.css'
import InfoCard from './InfoCard';

const sum = (accumulator, currentValue) => accumulator + currentValue

const average = array => array.reduce(sum) / array.length


// const rankModels = ({ defaultModels, compareMode }) => {

// 	const interpData = getInterpolation({ defaultModels, compareMode })

// 	console.log('interpData', interpData)

// 	const arr = interpData.map( (currentInterps) => currentInterps.interpolation)

// 	console.log('arr', arr)

// 	const averageModelMap = arr.map( (item) => item.map( (item2) => item2.value ))

// 	const ass = averageModelMap.map( (item) => average(item))

// 	console.log('avgMap', averageModelMap)

// 	console.log('ass', ass)

// 	return (ass.sort( (a, b) => (a, b) => a < b ? 1 : -1 ))
// }

const rankModels = ({ defaultModels, compareMode }) => {

	const averageModelMap = Object.keys(defaultModels).map( (modelId, i) => {

		const model = defaultModels[modelId]

		if (model.model.wltp.length) {

			const currentInterps = model.model.wltp[0].interpolations.filter(interp => interp.value_type === compareMode)
			if (currentInterps.length) {
				const interpAverage = average(currentInterps.map( item => item.value ))

				return ({
					modelId,
					average: interpAverage
				})
			}
		}

		return ({
			modelId,
			average: 0
		})
	}).filter(val => val)

	return (_.sortBy(averageModelMap, elem => elem.average).reverse())
}

class Dashboard extends Component {

	constructor(props)
	{
		super(props)

		this.state = {

			//when true displays more information about this config
			shouldShowMore: false,
		}
	}


	getInterpolations = ({ model, phase, compareMode}) => {

			if (model.model.wltp.length) {

				const currentInterps = model.model.wltp[0].interpolations
					.filter(interp => interp.value_type === compareMode && interp.phase == phase.key)
					.map( interp => interp.value)

					return ({
						value: currentInterps[0],
						phase: {
							label: phase.label,
							color: phase.color
						}

					})
			} else {
				return ({
					value: null,
					phase: {
						label: phase.label,
						color: phase.color
					}
				})
			}
	}

	render () {
		const {
			shouldShowMore,
		} = this.state

		const {
			defaultModels,
			compareMode,
			phases,
			openConfiguration,
		} = this.props

		const rankedModels = rankModels(this.props)

		return (

			rankedModels.map( (rankedModel, i) => {

				const currModel = defaultModels[rankedModel.modelId]
				const hasWltpData = rankedModel.average === 0
					? false
					: true

				return (
					<InfoCard
						key={i}
						ranking={i}
						model={ currModel }
						hasWltpData={ hasWltpData }
						compareMode={ compareMode }
						openConfiguration={ openConfiguration }
						getInterpolations={ this.getInterpolations }
						phases={ phases }
						average={ rankedModel.average.toFixed(2) }
					/>
				)
			})
		)
	}
}

export default Dashboard
