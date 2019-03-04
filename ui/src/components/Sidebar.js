import React from 'react'
import _ from 'lodash'
import {  Button, Icon } from 'react-bulma-components/full'

const sum = (accumulator, currentValue) => accumulator + currentValue

const average = array => array.reduce(sum) / array.length

const rankModels = (props) => {

	const { defaultModels, compareMode } = props

	const averageModelMap = Object.keys(defaultModels).map( (modelId, i) => {

		const model = defaultModels[modelId]

		console.log('current model ', model)

		if (model.wltp.length) {

			const currentInterps = model.wltp[0].interpolations.filter(interp => interp.value_type === compareMode)
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
	
	const {
		defaultModels,
	} = props
	const rankedModels = rankModels(props)
	const modelElems = rankedModels.map( (rankedModel, i) => {

		const currModel = defaultModels[rankedModel.modelId]

		console.log('fucking side bar', currModel)

		return (
			<div className='compare-model-wrapper' key={i}>
				<div className='compare-model-name-wrapper'>
					<span className='compare-model-name'>
						{`${i + 1}. ${currModel.name } `}
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
