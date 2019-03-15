import React, { Component } from 'react'
import { Button, Card, Heading, Image, Columns } from 'react-bulma-components/full'

import SlideShow from 'react-image-show'
import noImage from '../res/carIcon.png'
import tire from '../res/tire.png'
import co2 from '../res/co2.png'
import '../style/card.css'

const ShowMoreInformation = ({ data, enabled, compareMode}) => {
	const interpolationClassName = enabled
		? 'detailed-interpolation-wrapper open'
		: 'detailed-interpolation-wrapper'
	return (
		<div className={ interpolationClassName }>
			{data.map( (entry, i) => {
				return (
					<div className='more-interpolation' key={i}>
						<span> <font color={`${entry.phase.color}`}> {entry.phase.label} </font> {entry.value.toFixed(2)} {compareMode === 'CO2' ? ' l/100km' : ' g/km'} </span>
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
			config,
			openConfiguration,
			getInterpolations,
			phases,
			average,
			compareMode
		} = this.props

		const wltpData = config.wltp[0]
		const generalData = wltpData.general_data.values[0]

		//get the current Unit of selected compare mode
		let compareUnit = null
		wltpData.interpolations.forEach( interpolation =>
			interpolation.value_type === compareMode ? compareUnit = interpolation.unit : 0)

		return (
			<Card className='card-wrapper'>
				<Card.Header>
					<div className='header-wrapper'>
						<div className='header-card'>
							<Heading size={5}>
								{ ranking === 0 && <span className='icon ranking gold'><i className='fas fa-trophy'></i></span> }
								{ ranking === 1 && <span className='icon ranking silver'><i className='fas fa-trophy'></i></span> }
								{ ranking === 2 && <span className='icon ranking bronze'><i className='fas fa-trophy'></i></span> }
								{`${ranking + 1}.`} {config.model.name}
							</Heading>
							<Heading size={5} className='average-wrapper'> {`${average} ${compareUnit}` }</Heading>
						</div>
						<p className='typeName'>{config.type.name}</p>
					</div>
				</Card.Header>
				<Card.Content className='car-info'>
					<div className='image-wrapper'>
						{ config.images && config.images.length 
							? <SlideShow
								images={config.images.map( imageObj => imageObj.url)}
								width='700px'
								imagesWidth='625px'
								imagesHeight='351px'
								imagesHeightMobile='56vw'
								thumbnailsWidth='600px'
								thumbnailsHeight='12vw'
								indicators thumbnails fixedImagesHeight infinite
							/> 
							: <Image src={noImage}/>
						}
					</div>
					<Columns className='data-wrapper is-center'>
						<Columns.Column size="half" className="info-front-wrapper has-text-centered">
							{/* weight */}
							<span><i className='fas fa-weight-hanging'></i> {generalData.value.toFixed(2)} {generalData.unit}</span> 
						</Columns.Column>
						<Columns.Column size="half" className="info-front-wrapper has-text-centered">
							{/* fuel type */}
							<span><i className='fas fa-gas-pump'></i> {wltpData.fuel_types}</span>
						</Columns.Column>
						<Columns.Column className="info-wrapper">
							{/* Detailed Emissions */}
							<span className='compare-model-value'> 
								<span onClick={ this.setShowMoreEmissions }>
									<Image className='icon-info-img' src={co2} />
									<span className='infosubtitle-emission'> Detailed emissions </span>
									<i className={showMoreEmissions ? 'fas fa-chevron-down' : 'fas fa-chevron-right'}></i>
								</span> 
								
							</span>
							{ showMoreEmissions
								? <ShowMoreInformation key={ranking}
									data={ phases.map( phase => getInterpolations({ model: config, compareMode: 'CO2', phase}))} />
								: null } 
						</Columns.Column >
							{/* Detailed Consumption */}
						<Columns.Column className="info-wrapper">
						<span>
								<span onClick={ this.setShowMoreConsumption }>
									<i className='fas fa-tint'/>
									<span className='infosubtitle-consumption'>Detailed consumption </span>
									<i className={showMoreConsumption ? 'fas fa-chevron-down' : 'fas fa-chevron-right'}></i>
								</span>
							</span>
							{ showMoreConsumption
								? <ShowMoreInformation 
									key={ranking}
									data={ phases.map( phase => getInterpolations({ model: config, compareMode: 'CONSUMPTION', phase}))}
									compareMode={compareMode}
								/>: null }
						</Columns.Column>
						<Columns.Column className="info-wrapper">
							{/* Tire Classification */}
							<span className='tire-data-wrapper'>
								<span onClick={ this.setShowMoreTire } className='tire-header'>
									<Image className='icon-info-img' src={tire} />
									<span className='infosubtitle-tire'> Tire Classification </span>
									<i className={showMoreTire ? 'fas fa-chevron-down' : 'fas fa-chevron-right'}></i>
								</span>
							</span>
							{ showMoreTire
								? <ShowMoreTireInformation wltpData={ wltpData }/> 
								: null }
						</Columns.Column>
						{/* <div className='more-information-wrapper'>
						</div> */}
					</Columns>
					<div className='configure-panel'>
						<Button className='configure-button' onClick= { () => openConfiguration(config) } >
							<i className='fas fa-hammer'></i> Configure
						</Button>
					</div>
					
				</Card.Content>
			</Card>
		)
	}
}

export default InfoCard
