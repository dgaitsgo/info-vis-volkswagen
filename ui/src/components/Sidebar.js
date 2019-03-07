import React from 'react'
import _ from 'lodash'
import {  Button, Icon } from 'react-bulma-components/full'

const sum = (accumulator, currentValue) => accumulator + currentValue

const average = array => array.reduce(sum) / array.length

const rankModels = (props) => {

	const { defaultModels, compareMode } = props
	console.log('default Models', defaultModels)

	const averageModelMap = Object.keys(defaultModels).map( (modelId, i) => {

		const model = defaultModels[modelId]
		console.log('model', model)

		if (model.model.wltp.length) {

			const currentInterps = model.model.wltp[0].interpolations.filter(interp => interp.value_type === compareMode)
			console.log('currentInterps', currentInterps)
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

const Sidebar = (props) => {

	const {
		defaultModels,
		compareMode,
		openModal
	} = props

	const rankedModels = rankModels(props)

	const modelElems = rankedModels.map( (rankedModel, i) => {

		const currModel = defaultModels[rankedModel.modelId]

		return (
			<div className='compare-model-wrapper' key={i}>
				<div className='compare-model-name-wrapper'>
					<div className='compare-model-name'>
						{ i === 0 && <span className='icon ranking gold'><i className='fas fa-trophy'></i></span> }
						{ i === 1 && <span className='icon ranking silver'><i className='fas fa-trophy'></i></span> }
						{ i === 2 && <span className='icon ranking bronze'><i className='fas fa-trophy'></i></span> }
						<span>{`${i + 1}. ${currModel.model.name } `}</span>
						<span className='options-plus' style={{ color : 'blue' }} onClick={ () =>
							openModal({
								model_id: currModel.model.id,
								model_name: currModel.model.name,
								})}>
							+</span>
					</div>

					<span className='compare-model-value'>
						{ rankedModel.average.toFixed(2) }
					</span>
				</div>

			</div>
		)
	})

	return (
		<div className='sidebar-wrapper'> {modelElems} </div>
	)
}

export default Sidebar
