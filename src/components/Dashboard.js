import React, { Component } from 'react'
import _ from 'lodash'
import { Loader, Button, Icon, Box, Heading } from 'react-bulma-components/full'

const sum = (accumulator, currentValue) => accumulator + currentValue

const average = array => array.reduce(sum) / array.length

const rankModels = (props) => {

	const { fullModels, compareMode } = props

	const averageModelMap = Object.keys(fullModels.data).map( (modelId, i) => {

		const model = fullModels.data[modelId]

		if (model.wltp.data.length) {

			const currentInterps = model.wltp.data[0].interpolations.filter(interp => interp.value_type === compareMode)
			if (currentInterps.length) {
				const interpAverage = average(currentInterps.map( item => item.value ))

				return ({
					modelId,
					average: interpAverage
				})
			}
		}

		return null
	}).filter(val => val)

	return (_.sortBy(averageModelMap, elem => elem.average).reverse())
}

const Dashboard = (props) => {

	const {
		fullModels,
		compareMode,
		openModal
	} = props

	const rankedModels = rankModels(props)
	const typeData = Object.keys(fullModels.typeData).map( wholeModel => fullModels.typeData[wholeModel])

	const modelElems = rankedModels.map( (rankedModel, i) => {

		const currModel = fullModels.data[rankedModel.modelId]

		return (
			<div className='compare-model-wrapper' key={i}>
				<Box className='compare-model-name-wrapper'>
					<div className='compare-model-name'>
						<Heading size={6}>
							{ i === 0 && <span className='icon ranking gold'><i className='fas fa-trophy'></i></span> }
							{ i === 1 && <span className='icon ranking silver'><i className='fas fa-trophy'></i></span> }
							{ i === 2 && <span className='icon ranking bronze'><i className='fas fa-trophy'></i></span> }
						{`${i + 1}. ${currModel.model.name } `}
							<span className='options-plus' style={{ color : 'blue' }} onClick={ () =>
								openModal({
									model_id: currModel.model.id,
									model_name: currModel.model.name,
									typeName: typeData[i].type.name,
									typeId: typeData[i].type.name
									})}>
									+
							</span>
						</Heading>
					</div>
					<span className='compare-model-value'>
						{ rankedModel.average.toFixed(2) }
					</span>
				</Box>

			</div>
		)
	})

	return (
		<div className='dashboard-wrapper'> {modelElems} </div>
	)
}

export default Dashboard
