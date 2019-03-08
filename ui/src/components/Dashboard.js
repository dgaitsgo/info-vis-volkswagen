import React, { Component } from 'react'
import _ from 'lodash'
import { Box, Button, Icon, Card, Heading, Media, Image } from 'react-bulma-components/full'

import '../style/dashboard.css'

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

const Interpolation = ({ data, compareMode}) => {
	return (
		<div>
			{data.map( entry => {

				return (
					<div>
						{entry.phase + ' ' + entry.value}
					</div>
				)
			})}
		</div>
	)
}

class Dashboard extends Component {

	constructor(props)
	{
		super(props)

		this.state = {

			//when true displays more information about this config
			shouldShowMore: false,
		}
		this.phases = [
			'LOW', 'MEDIUM', 'HIGH', 'EXTRA_HIGH', 'COMBINED'
		]
	}

	showMore = () => {
		this.setState( { shouldShowMore: !this.state.shouldShowMore})
	}

	getInterpolations = ({ model, phase, compareMode}) => {

			if (model.model.wltp.length) {

				const currentInterps = model.model.wltp[0].interpolations
					.filter(interp => interp.value_type === compareMode && interp.phase == phase)
					.map( interp => interp.value)

					return ({
						value: currentInterps[0],
						phase: phase
					})
			} else {
				return ({
					value: null,
					name: phase
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
			openConfiguration,
		} = this.props

		const rankedModels = rankModels(this.props)

		const modelElems = rankedModels.map( (rankedModel, i) => {

			const currModel = defaultModels[rankedModel.modelId]
			const shouldDisplayRank = rankedModel.average === 0
				? false
				: true

			return (
				<Card className='compare-model-wrapper' key={i}>
					<Card.Header>
						{ i === 0 && shouldDisplayRank && <span className='icon ranking gold'><i className='fas fa-trophy'></i></span> }
						{ i === 1 && shouldDisplayRank && <span className='icon ranking silver'><i className='fas fa-trophy'></i></span> }
						{ i === 2 && shouldDisplayRank && <span className='icon ranking bronze'><i className='fas fa-trophy'></i></span> }
						<Heading size={4}> {`${i + 1}. ${currModel.model.name } `} </Heading>
						<Heading size={6}> {currModel.type.name} </Heading>
					</Card.Header>
					<Card.Content>
						<Media>
							<Media.Item>
							</Media.Item>
						</Media>
						<div>
							<div className='compare-model-value'>
								<span
									onClick={ this.showMore }
								> + </span>
								{	shouldDisplayRank
										? 'average ' + compareMode + ' ' + rankedModel.average.toFixed(2)
										: 'No data found'
								}
							</div>
							{ shouldShowMore
								? <Interpolation
									data={ this.phases.map( phase=> this.getInterpolations({ model: currModel, compareMode, phase}))}
									compareMode={ compareMode }
								/>
								: null
							}
							<div>
								consumption
							</div>
							<div>
								show more
							</div>
						</div>
						<Button
							className='configure-button'
							onClick= { () =>
								openConfiguration({
									modelId: currModel.model.model_id,
									modelName: currModel.model.name,
									typeName: currModel.type.name,
									typeId: currModel.type.id
								})}
						> configure </Button>
					</Card.Content>
				</Card>
			)
		})

		return (
			<div className='sidebar-wrapper'> {modelElems} </div>
		)
	}
}

export default Dashboard
