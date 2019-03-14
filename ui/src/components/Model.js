import React from 'react'
import { Heading, Columns, Card } from 'react-bulma-components/full'
import debounce  from 'lodash/debounce'
import '../style/model.css'
import DEBOUNCE_TIME from '../constants/DEBOUNCE_TIME'

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
			<Card className={modelClassName} onClick={ debounce(() => onClick({ id, name }), DEBOUNCE_TIME) }>
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
