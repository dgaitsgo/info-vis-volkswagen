import React, { Component } from 'react'
import _ from 'lodash'
import { Box, Button, Icon, Card, Heading, Media, Image, Columns } from 'react-bulma-components/full'

import '../style/card.css'
import { compare } from 'ltgt'
import carThumbnail from '../res/carIcon.png'

const ShowMoreInformation = ({ data, enabled}) => {
	const interpolationClassName = enabled
		? 'detailed-interpolation-wrapper open'
		: 'detailed-interpolation-wrapper'
	return (
		<div className={ interpolationClassName }>
			{data.map( entry => {
				return (
					<div>
						<span> <font color={`${entry.phase.color}`}> {entry.phase.label} </font> {entry.value.toFixed(2)} </span>
					</div>
				)
			})}
		</div>
	)
}

const ShowMoreTireInformation = ({ wltpData }) => {
	return (
		<div className='show-more-tire-wrapper'>
			{Object.keys(wltpData.tire).map( key => {
				return (
					<div className='tire-wrapper' key={key}>
						{`${key}: ${wltpData.tire[key].category}`}
					</div>
				)
			})}
		</div>
	)
}

class InfoCard extends Component {

	constructor(props)
	{
		super(props)

		this.state = {
			showMoreEmissions: false,
			showMoreConsumption: false,
			showMoreTire: false,
		}
	}

	setShowMoreEmissions = () => this.setState({ showMoreEmissions: !this.state.showMoreEmissions })

	setShowMoreConsumption = () => this.setState({ showMoreConsumption: !this.state.showMoreConsumption })

	setShowMoreTire = () => this.setState({ showMoreTire: !this.state.showMoreTire })


	render(){

		const {
			showMoreEmissions,
			showMoreConsumption,
			showMoreTire
		} = this.state

		const {
			ranking,
			model,
			compareMode,
			openConfiguration,
			getInterpolations,
			phases,
			average
		} = this.props

		const wltpData = model.model.wltp[0]
		const generalData = wltpData.general_data.values[0]

		//get the current Unit of selected compare mode
		let compareUnit = null
		wltpData.interpolations.forEach( interpolation =>
			interpolation.value_type === compareMode ? compareUnit = interpolation.unit : 0)

		return (
				<Card className='compare-model-wrapper'>
					<Card.Header>
						<div className='header-wrapper'>
							<div className="header-card">
								<h1>
									{ ranking === 0 && <span className='icon ranking gold'><i className='fas fa-trophy'></i></span> }
									{ ranking === 1 && <span className='icon ranking silver'><i className='fas fa-trophy'></i></span> }
									{ ranking === 2 && <span className='icon ranking bronze'><i className='fas fa-trophy'></i></span> }
									{`${ranking + 1}.`} { model.model.name.toUpperCase() }
								</h1>
								<p className='average-wrapper'> {`${average} ${compareUnit}` }</p>
							</div>
							<p className="typeName">{model.type.name}</p>
						</div>
					</Card.Header>
					<Card.Content>
						<Columns className="car-img" >
							<Columns.Column>
								<Image style={{width: 256}} src={carThumbnail}/>
							</Columns.Column>
							<Columns.Column>
								<div className='data-wrapper'>
									<div>
										<i class="fas fa-weight-hanging"></i> {generalData.value.toFixed(2)} {generalData.unit}
									</div>
									<div>
										<i class="fas fa-gas-pump"></i> {wltpData.fuel_types}
									</div>
									<div className='compare-model-value'>
										<span onClick={ this.setShowMoreEmissions }> Detailed emissions<Icon icon="angle-down"/> </span>
										{ showMoreEmissions
											? <ShowMoreInformation
												key={ranking}
												data={ phases.map( phase => getInterpolations({ model: model, compareMode: 'CO2', phase}))}
											/>: null }
									</div>
									<div>
										<span onClick={ this.setShowMoreConsumption }><i class="fas fa-tint"/> Detailed consumption<Icon icon="angle-down"/></span>
										{ showMoreConsumption
											? <ShowMoreInformation
												key={ranking}
												data={ phases.map( phase => getInterpolations({ model: model, compareMode: 'CONSUMPTION', phase}))}
											/>: null }
									</div>
									<div className='tire-data-wrapper'>
										<span onClick={ this.setShowMoreTire } className='tire-header'> TireIcon class <Icon icon="angle-down"/></span>
										{ showMoreTire
											? <ShowMoreTireInformation
												wltpData={ wltpData }
											/> : null }
									</div>
								</div>
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
							</Columns.Column>
						</Columns>
					</Card.Content>
				</Card>
		)
	}
}

export default InfoCard
