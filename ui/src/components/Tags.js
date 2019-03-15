import React from 'react'
import debounce from 'lodash/debounce'
import DEBOUNCE_TIME from '../constants/debounceTime'
import '../style/options.css'

const Tags = ({ selectedOptions, flatChoices, removeOption }) => {

	if(!selectedOptions || !flatChoices)
		return null

	return (
		<div className='tags-wrapper'>
			{selectedOptions.map( (optionId, i) => {
					return (
						<div className='tag description-tag' key={`tag_${i}`}>
							{flatChoices[optionId] && flatChoices[optionId].choiceDescription ? flatChoices[optionId].choiceDescription : <i>(No Description)</i>}
							<span onClick={ () => removeOption(optionId) } className='tag-close'><i className='fas fa-times'></i></span>
						</div>
					)
				})
			}
		</div>
	)
}

export default Tags