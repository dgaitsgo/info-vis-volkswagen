import React from 'react'
import PropTypes from 'prop-types'
import { Heading, Columns, Box, Card } from "react-bulma-components/full"
import '../style/model.css'

const Model = ({
    id, name, onClick, selected, src
}) => {

	const modelClassName = selected
		? 'model selected'
		: 'model'

	const imgSrc = 'https://bit.ly/2SBDH3b'
    return (
		<div className='model-wrapper'>
        <Columns.Column>
			<Card className={modelClassName} onClick={ () => onClick({ id, name }) }>
				{/* When selected the model faces you -> see audi website */}
				<Card.Content>
					<Heading size={4}>{ name }</Heading>
					{ selected && selected.type && selected.type.name }
				</Card.Content>
			</Card>
		</Columns.Column>
		</div>
    )
}

export default Model