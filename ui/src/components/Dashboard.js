import React, { Component } from 'react'
import InfoCard from './InfoCard'
import _ from 'lodash'

import '../style/dashboard.css'

const sum = (accumulator, currentValue) => accumulator + currentValue

const average = array => array.reduce(sum) / array.length

const rankModels = ({ configurations, compareMode }) => {

	const averageModelMap = Object.keys(configurations).map( (modelId, i) => {

		const model = configurations[modelId]

		console.log('checking value of length : ', model)

		if (model.wltp.length) {

			const currentInterps = model.wltp[0].interpolations.filter(interp => interp.value_type === compareMode)
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

			if (model.wltp.length) {

				const currentInterps = model.wltp[0].interpolations
					.filter(interp => interp.value_type === compareMode && interp.phase === phase.key)
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
			configurations,
			compareMode,
			phases,
			openConfiguration,
		} = this.props

		const rankedModels = rankModels(this.props)

		return (

			rankedModels.map( (rankedModel, i) => {

				const currModel = configurations[rankedModel.modelId]
				const hasWltpData = rankedModel.average === 0
					? false
					: true

				return (
					<InfoCard
						key={`infoCard_${i}`}
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
