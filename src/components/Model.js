import React from 'react'

import PropTypes from 'prop-types';
import List from 'react-list';

const Model = ({
    id, name, onClick, selected, src
}) => {

	const className = selected
		? 'model selected'
		: 'model'

    return (
        <div className={className} onClick={ () => onClick(id) }>
			<img src={ src } alt={ name } />
			<div>
				{ name }
			</div>
		</div>

    )
}

export default Model