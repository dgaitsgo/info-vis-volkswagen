import React, { Component } from 'react'
import _ from 'lodash'
import { Box, Button, Icon, Card, Heading, Media, Image, Columns } from 'react-bulma-components/full'

import '../style/dashboard.css'
import '../style/infocard.css'
import { compare } from 'ltgt';
import carTumbNail from '../res/carIcon.png'

import ReactTooltip from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tire } from '@fortawesome/free-solid-svg-icons'


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

const NoData = () => {
	return (
		<div>
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

class InfoCard extends Component {

	constructor(props)
	{
		super(props)

		this.state = {
			showMoreEmissions: false,
			showMoreConsumption: false
		}
	}

	setMoreEmissions = () => {
		this.setState( { showMoreEmissions: !this.state.showMoreEmissions})
	}

	setMoreConsumption = () => {
		this.setState( { showMoreConsumption: !this.state.showMoreConsumption})
	}

	render(){

		const {
			showMoreEmissions,
			showMoreConsumption
		} = this.state

		const {
			ranking,
			hasWltpData,
			model,
			compareMode,
			openConfiguration,
			getInterpolations,
			phases,
			average
		} = this.props

		const wltpData = model.model.wltp[0]

		const generalData = hasWltpData ? wltpData.general_data.values[0] : {}

		return (
				<Card className='compare-model-wrapper'>
    
					<Card.Header>
            <div className="headerCard">
						  { ranking === 0 && hasWltpData && <span className='icon ranking gold'><i className='fas fa-trophy'></i></span> }
						  { ranking === 1 && hasWltpData && <span className='icon ranking silver'><i className='fas fa-trophy'></i></span> }
					  	{ ranking === 2 && hasWltpData && <span className='icon ranking bronze'><i className='fas fa-trophy'></i></span> }
						  <Heading size={4}> { hasWltpData && `${ranking + 1}.`} { model.model.name.toUpperCase() } </Heading>
						  <p className="typeName">{model.type.name} </p>
						  <p className="averageNum">Average of LOW, MEDIUM, HIGH, and EXTRA_HIGH: {average} </p>
            </div>
					</Card.Header>
					<Card.Content>
            <Columns className="carImg" >
							<Columns.Column>
							<Image style={{width: 256}} src={carTumbNail}/>
							</Columns.Column>
						<Columns.Column>
							{	hasWltpData
									?
									<div className='has-wltp-data-wrapper'>
										<div>
											<i class="fas fa-weight-hanging"></i> {generalData.value.toFixed(2)}{generalData.unit}
										</div>
										<div>
											<i class="fas fa-gas-pump"></i> {wltpData.fuel_types}
										</div>
										<div className='compare-model-value'>
											<span onClick={ this.setMoreEmissions }> Detailed emissions<Icon icon="angle-down"/> </span>
											{ showMoreEmissions
												? <ShowMoreInformation
													key={ranking}
													data={ phases.map( phase => getInterpolations({ model: model, compareMode: 'CO2', phase}))}
												/>
												: null
											}
										</div>
										<div>
											<span onClick={ this.setMoreConsumption }><i class="fas fa-tint"/> Detailed consumption<Icon icon="angle-down"/></span>
											{ showMoreConsumption
												? <ShowMoreInformation
													key={ranking}
													data={ phases.map( phase => getInterpolations({ model: model, compareMode: 'CONSUMPTION', phase}))}
												/>
												: null
											}
										</div>
										<div>
											TireIcon class <Icon icon="angle-down"/>
											{Object.keys(wltpData.tire).map( key => {
												return (
													<div>
														{`${key}: ${wltpData.tire[key].category}`}
													</div>
												)
											})}
										</Columns.Column>
									: <NoData/>
							}
							<Button
							className='configure-button'
							onClick= { () =>
								openConfiguration({
									modelId: model.model.model_id,
									modelName: model.model.name,
									typeName: model.type.name,
									typeId: model.type.id
								})}
						> configure </Button>
							</Columns.Column>
						</Columns>
							
					</Card.Content>
				</Card>
		)
	}
}

export default InfoCard
