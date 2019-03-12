import React, { Component } from 'react'
import { sortBy } from 'lodash'
import InfoCard from './InfoCard'
import MissingCard from '../components/MissingCard'

import '../style/dashboard.css'

const sum = (accumulator, currentValue) => accumulator + currentValue

const average = array => array.reduce(sum) / array.length

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
			average: null
		})
	})

	return (sortBy(averageModelMap, elem => elem.average))
}

class Dashboard extends Component {

	constructor(props)
	{
		super(props)

		this.state = {

		}
	}


	getInterpolations = ({ model, phase, compareMode}) => {

			if (model.model.wltp.length) {

				const currentInterps = model.model.wltp[0].interpolations
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
			defaultModels,
			compareMode,
			phases,
			openConfiguration,
		} = this.props

		const rankedModels = rankModels(this.props)

		return (
			<div className='dashboard-wrapper'>
			{
				rankedModels.map( (rankedModel, i) => {

					const currModel = defaultModels[rankedModel.modelId]
					const hasWltpData = rankedModel.average !== null
					const avg = hasWltpData ? rankedModel.average.toFixed(2) : null

					if (hasWltpData) {
						return (
							<InfoCard
								key={`infoCard_${i}`}
								ranking={i}
								model={ currModel }
								compareMode={ compareMode }
								compareUnit={ null }
								openConfiguration={ openConfiguration }
								getInterpolations={ this.getInterpolations }
								phases={ phases }
								average={ avg }
							/>
						)
					}
					else {
						return (
							<MissingCard
								key={`missingCard_${i}`}
								model={ currModel }
								hasWltpData={ hasWltpData }
								openConfiguration={ openConfiguration }
							/>
						)
					}
				})
			}
			</div>
		)
	}
}

export default Dashboard
