import React from 'react'
import { Heading, Columns, Card } from "react-bulma-components/full"
import '../style/model.css'

const Model = ({id, name, onClick, selected, src}) => {

	const modelClassName = selected
		? 'model selected'
		: 'model'
	const headingClassName = selected
		? 'headingModel has-text-centered selected'
		: 'headingModel has-text-centered'
	const typeNameClassName = selected
		? 'typeNameBlock selected'
		: 'typeNameBlock'

    return (
		<div className='model-wrapper'>
        <Columns.Column>
			<Card className={modelClassName} onClick={ () => onClick({ id, name }) }>
				<Card.Content>
					<div>
					<Heading className={headingClassName} size={5}>{ name }</Heading>
					</div>
					<div className={typeNameClassName}>
					{ selected && selected.type && selected.type.name }
					</div>
				</Card.Content>

			</Card>
		</Columns.Column>
		</div>
    )
}

export default Model
