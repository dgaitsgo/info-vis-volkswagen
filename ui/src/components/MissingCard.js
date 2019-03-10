import React from 'react'
import { Card, Button } from 'react-bulma-components/full'
import ReactTooltip from 'react-tooltip'
import '../style/card.css'

const NoData = () => {
	return (
		<div className='no-data-found-wrapper'>
			<font color='#d50000'> No Data Found </font>
			<i data-tip='Please be advised, that currently not for all models within OKAPI,
				WLTP values can be provided.'
			class="fas fa-info-circle"/>
			<ReactTooltip
				place='top'
				type='dark'
				clickable={true}
			/>
		</div>
	)
}

const MissingCard = ({ model, openConfiguration}) => {

	return (
		<Card className='missing-card-wrapper'>
			<Card.Header>
				<div className='header-wrapper'>
					<div className="header-card">
						<h1>
							{ model.model.name.toUpperCase() }
						</h1>
					</div>
					<p className="typeName">{model.type.name}</p>
				</div>
			</Card.Header>
			<Card.Content>
				<NoData/>
				<Button
					className='configure-button'
					onClick= { () =>
						openConfiguration({
							modelId: model.model.model_id,
							modelName: model.model.name,
							typeName: model.type.name,
							typeId: model.type.id
						})}
					> configure
				</Button>
			</Card.Content>
		</Card>
	)
}

export default MissingCard
