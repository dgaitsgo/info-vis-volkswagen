import React from 'react'
import PropTypes from 'prop-types'
import { Columns } from "react-bulma-components/full"
import { Box } from "react-bulma-components/full"
import '../style/model.css'

const Model = ({
    id, name, onClick, selected, src
}) => {

	const className = selected
		? 'model selected'
		: 'model'

    return (
        <Columns.Column>
		<Box className={className} onClick={ () => onClick({ id, name }) }>
			<div className="model-name has-text-centered">
				{ name }
			</div>
			</Box>
		</Columns.Column>

    )
}

export default Model