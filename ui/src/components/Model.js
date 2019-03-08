import React from 'react'
import PropTypes from 'prop-types'
import { Heading, Columns, Box, Card } from "react-bulma-components/full"
import '../style/model.css'
import carIcon from '../res/carIcon.png'
import carIconR from '../res/carIcon-r.png'

const Model = ({
    id, name, onClick, selected, src
}) => {

	const modelClassName = selected
		? 'model selected'
		: 'model'
	const headingClassName = selected
		? 'headingModel selected'
		: 'headingModel'
    return (
		<div className='model-wrapper'>
        <Columns.Column>
			<Card className={modelClassName} onClick={ () => onClick({ id, name }) }>
				<Card.Content>	
					<div>
					<Heading className={headingClassName} size={4}>{ name.toUpperCase() }</Heading>
						{/* <img className="imgIcon" src={carIcon} />  */}
					</div>
					<div className="typeNameBlock">
					{ selected && selected.type && selected.type.name }
					</div>	
				</Card.Content>
							
			</Card>
		</Columns.Column>
		</div>
    )
}

export default Model