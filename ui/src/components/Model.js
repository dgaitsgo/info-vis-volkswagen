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


		<div>
        <Columns.Column>
			{/* <Box className={className} onClick={ () => onClick({ id, name }) }>
				<div className="model-name has-text-centered">
					{ name }
				</div>
			</Box> */}
			<Card className={modelClassName} onClick={ () => onClick({ id, name }) }>
				{imgSrc
					? <Card.Image src={imgSrc}/>
					: <div> <span><i className="fas fa-car"></i></span> </div>}
				<Card.Content>
					<Heading size={4}>{ name }</Heading>
				</Card.Content>
			</Card>
		</Columns.Column>
		</div>
    )
}

export default Model