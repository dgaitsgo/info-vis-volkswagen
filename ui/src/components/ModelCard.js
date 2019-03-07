import React from 'react'

const ModelCard = ({ options, name }) => {
	return (
		<div className='modelcard-wrapper'>
			<div className='modelcard-name'>
				{ name }
			</div>
			<div className='modelcard-option-wrapper'>
				{options.forEach(option => {
					return (
						<div className='modelcard-option'>
							{ option.description }
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default ModelCard
