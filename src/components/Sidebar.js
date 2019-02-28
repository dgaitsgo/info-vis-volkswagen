import React, { Component } from 'react'
import _ from 'lodash'
import { Loader, Button, Icon } from 'react-bulma-components/full'

const sum = (accumulator, currentValue) => accumulator + currentValue

const average = array => array.reduce(sum) / array.length

const rankModels = (props) => {

	const { fullModels, compareMode } = props

	console.log('compare ', props)

	const averageModelMap = Object.keys(fullModels.data).map( (modelId, i) => {

		const model = fullModels.data[modelId]

		console.log('current model ', model)

		if (model.wltp.data.length) {

			const currentInterps = model.wltp.data[0].interpolations.filter(interp => interp.value_type === compareMode)
			// console.log('current interps', currentInterps)
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

	_.sortBy(averageModelMap, 'average').reverse()

	return (averageModelMap)
}


const Sidebar = (props) => {
	const{
		fullModels,
		compareMode
	} = props
	const rankedModels = rankModels(props)
	const modelElems = rankedModels.map( (rankedModel, i) => {

		const currModel = fullModels.data[rankedModel.modelId]

		console.log('fucking side bar', currModel)

		return (
			<div className='compare-model-wrapper' key={i}>
				<div className='compare-model-name-wrapper'>
					<span className='compare-model-name'>
						{`${i + 1}. ${currModel.model.name } `}
					</span>
					<span className='compare-model-value'>
						{ rankedModel.average }
					</span>
					<Button><Icon icon="bars" color="info" /></Button>
				</div>

			</div>
		)
	})

	return (
		<div className='sidebar-wrapper'> {modelElems} </div>
	)
}

export default Sidebar
