import React from 'react'
import debounce from 'lodash/debounce'
import DEBOUNCE_TIME from '../constants/debounceTime'

const Tags = ({ selectedOptions, flatChoices, removeOption }) => {

	if(!selectedOptions || !flatChoices)
		return null

	return (
		<div className='tags-wrapper'>
			{selectedOptions.map( (option, i) => {
					if (!flatChoices[option.id])
						console.log('missing option is', option.id)
					return (
						<div className='tag description-tag' key={`tag_${i}`}>
							{flatChoices[option.id] && flatChoices[option.id].choiceDescription}
							<span onClick={ debounce(() => removeOption(option.id), DEBOUNCE_TIME) } className='tag-close'><i className='fas fa-times'></i></span>
						</div>
					)
				})
			}
		</div>
	)
}

export default Tags