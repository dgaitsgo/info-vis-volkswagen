import React from 'react'
import { Card, Button } from 'react-bulma-components/full'
import ReactTooltip from 'react-tooltip'
import '../style/card.css'

const NoData = () => {
	return (
		<div className='no-data-found-wrapper'>
			<font color='#f96666'> No Data Found </font>
			<i data-tip='Please be advised, that currently not for all models within OKAPI,
				WLTP values can be provided.'
			className='fas fa-info-circle'/>
			<ReactTooltip
				place='top'
				type='dark'
				clickable={true}
			/>
		</div>
	)
}

const MissingCard = ({ config, openConfiguration}) => {

	return (
		<Card className='card-wrapper missing-wrapper'>
			<Card.Header>
				<div className='header-wrapper'>
					<div className='header-card'><h1>{ config.model.name }</h1></div>
					<p className='typeName'>{config.type.name}</p>
				</div>
			</Card.Header>
			<Card.Content>
				<div className='configure-panel'>
					<NoData/>
					<Button
						className='configure-button'
						onClick= { () => openConfiguration({configId: config.model.config_id, configName: config.model.name, typeName: config.type.name, typeId: config.type.id})}
					><i className='fas fa-hammer'></i> Configure
					</Button>
				</div>
			</Card.Content>
		</Card>
	)
}

export default MissingCard
