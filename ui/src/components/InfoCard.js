import React, { Component } from 'react'
import { Button, Card, Heading, Image, Columns } from 'react-bulma-components/full'

import '../style/dashboard.css'
import carThumbnail from '../res/carIcon.png'
import tire from '../res/tire.png'
import co2 from '../res/co2.png'

const ShowMoreInformation = ({ data, enabled}) => {
	const interpolationClassName = enabled
		? 'detailed-interpolation-wrapper open'
		: 'detailed-interpolation-wrapper'
	return (
		<div className={ interpolationClassName }>
			{data.map( (entry, i) => {
				return (
					<div className='more-interpolation' key={i}>
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
			openConfiguration,
			getInterpolations,
			phases,
			average,
			compareMode
		} = this.props

		const wltpData = model.wltp[0]
		const generalData = wltpData.general_data.values[0]

		//get the current Unit of selected compare mode
		let compareUnit = null
		wltpData.interpolations.forEach( interpolation =>
			interpolation.value_type === compareMode ? compareUnit = interpolation.unit : 0)

		return (
				<Card className='card-wrapper'>
					<Card.Header>
						<div className='header-wrapper'>
							<div className="header-card">
								<Heading size={5}>
									{ ranking === 0 && <span className='icon ranking gold'><i className='fas fa-trophy'></i></span> }
									{ ranking === 1 && <span className='icon ranking silver'><i className='fas fa-trophy'></i></span> }
									{ ranking === 2 && <span className='icon ranking bronze'><i className='fas fa-trophy'></i></span> }
									{ `NO ${ranking + 1}.`} { model.model.name.toUpperCase() }
								</Heading>
								<Heading size={5} className='average-wrapper'> {`${average} ${compareUnit}` }</Heading>
							</div>
							<p className='typeName'>{model.type.name}</p>
						</div>
					</Card.Header>
					<Card.Content className="carInfo">
						<Columns>
							<Columns.Column>
								<Image src={carThumbnail}/>
							</Columns.Column>
							<Columns.Column>
								<div className='data-wrapper'>
									<div>
										<i className='fas fa-weight-hanging'></i> {generalData.value.toFixed(2)} {generalData.unit}
									</div>
									<div>
										<i className='fas fa-gas-pump'></i> {wltpData.fuel_types}
									</div>
									<div className='compare-model-value'>
										<span onClick={ this.setShowMoreEmissions }><Image className="iconInfoImg" src={co2} /><span className="infosubtitle"> Detailed emissions </span><i className={showMoreEmissions ? 'fas fa-chevron-down' : 'fas fa-chevron-right'}></i> </span>
										{ showMoreEmissions
											? <ShowMoreInformation
												key={ranking}
												data={ phases.map( phase => getInterpolations({ model: model, compareMode: 'CO2', phase}))}
											/>: null }
									</div>
									<div>
										<span onClick={ this.setShowMoreConsumption }><i className='fas fa-tint'/> <span className="infosubtitle2">Detailed consumption</span> <i className={showMoreConsumption ? 'fas fa-chevron-down' : 'fas fa-chevron-right'}></i></span>
										{ showMoreConsumption
											? <ShowMoreInformation
												key={ranking}
												data={ phases.map( phase => getInterpolations({ model: model, compareMode: 'CONSUMPTION', phase}))}
											/>: null }
									</div>
									<div className='tire-data-wrapper'>
										<span onClick={ this.setShowMoreTire } className='tire-header'><Image className="iconInfoImg" src={tire} /> <span className="infosubtitle"> Tire Classification </span><i className={showMoreTire ? 'fas fa-chevron-down' : 'fas fa-chevron-right'}></i></span>
										{ showMoreTire
											? <ShowMoreTireInformation
												wltpData={ wltpData }
											/> : null }
									</div>
								</div>
								<Button
									className='configure-button'
									onClick= { () => openConfiguration(model) } 
								><i className="fas fa-hammer"></i>Configure
								</Button>
							</Columns.Column>
						</Columns>
					</Card.Content>
				</Card>
		)
	}
}

export default InfoCard
