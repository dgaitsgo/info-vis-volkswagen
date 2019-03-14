import React, { Component } from 'react'
import InfoCard from './InfoCard'
import MissingCard from './MissingCard'
import sortBy from 'lodash/sortBy'
import '../style/dashboard.css'

const sum = (accumulator, currentValue) => accumulator + currentValue

const average = array => array.reduce(sum) / array.length

const rankModels = ({ configurations, compareMode}) => {

	const averageModelMap = Object.keys(configurations).map( (modelId, i) => {

		const model = configurations[modelId]

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
			average: null
		})
	})

	return (sortBy(averageModelMap, elem => elem.average))
}

class Dashboard extends Component {

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
			<div className='dashboard-wrapper'>
			{
				rankedModels.map( (rankedModel, i) => {

					const currConfig = configurations[rankedModel.modelId]
					const hasWltpData = rankedModel.average !== null
					const avg = hasWltpData ? rankedModel.average.toFixed(2) : null

					if (hasWltpData) {
						return (
							<InfoCard
								key={`infoCard_${i}`}
								ranking={i}
								config={ currConfig }
								
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
								config={ currConfig }
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
