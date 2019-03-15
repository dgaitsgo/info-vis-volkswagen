import React from 'react'
import { Heading, Columns, Card } from 'react-bulma-components/full'
import debounce  from 'lodash/debounce'
import '../style/model.css'
import DEBOUNCE_TIME from '../constants/debounceTime'

const Model = ({id, name, onClick, selected, src}) => {

	const modelClassName = selected
		? 'model selected'
		: 'model'
	const headingClassName = selected
		? 'heading-model has-text-centered selected'
		: 'heading-model has-text-centered'
	const typeNameClassName = selected
		? 'type-name-block selected'
		: 'type-name-block'

    return (
		<div className='model-wrapper'>
        <Columns.Column>
			<Card className={modelClassName} onClick={ debounce(() => onClick({ id, name }), DEBOUNCE_TIME) }>
				<Card.Content>
					<Heading className={headingClassName} size={5}>{ name }</Heading>
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
