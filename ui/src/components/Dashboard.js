import React from 'react'
import _ from 'lodash'
import {  Button, Icon, Card, Heading, Media, Image } from 'react-bulma-components/full'

const sum = (accumulator, currentValue) => accumulator + currentValue

const average = array => array.reduce(sum) / array.length

const rankModels = (props) => {

	const { defaultModels, compareMode } = props

	const averageModelMap = Object.keys(defaultModels).map( (modelId, i) => {

		const model = defaultModels[modelId]
		console.log(model)

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

	console.log('averageModelMap', averageModelMap)

	return (_.sortBy(averageModelMap, elem => elem.average).reverse())
}

const Dashboard = (props) => {

	const {
		defaultModels,
		compareMode,
		openModal
	} = props

	const rankedModels = rankModels(props)

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
					<Heading> {`${i + 1}. ${currModel.model.name } `} </Heading>
				</Card.Header>
				<Card.Content>
					<Media>
						<Media.Item>
							<Image src='lel' alt='No image'/>
						</Media.Item>
					</Media>
					<span className='compare-model-value'>
						{	shouldDisplayRank
								? compareMode + rankedModel.average.toFixed(2)
								: 'No WLTP Data found :('
						}
					</span>
					<Button
						className='configure-button'
						onClick= { () =>
							openModal({
								model_id: currModel.model.id,
								model_name: currModel.model.name,
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

export default Dashboard
