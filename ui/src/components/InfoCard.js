import React, { Component } from 'react'
import _ from 'lodash'
import { Box, Button, Icon, Card, Heading, Media, Image } from 'react-bulma-components/full'

import '../style/dashboard.css'

import ReactTooltip from 'react-tooltip'

const Interpolation = ({ data }) => {
	return (
		<div>
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
			shouldShowMore: false,
		}
	}

	showMore = () => {
		this.setState( { shouldShowMore: !this.state.shouldShowMore})
	}

	render(){

		const {
			shouldShowMore,
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

		console.log(wltpData)

		const generalData = hasWltpData ? wltpData.general_data.values[0] : {}

		return (
				<Card className='compare-model-wrapper'>
					<Card.Header>
						{ ranking === 0 && hasWltpData && <span className='icon ranking gold'><i className='fas fa-trophy'></i></span> }
						{ ranking === 1 && hasWltpData && <span className='icon ranking silver'><i className='fas fa-trophy'></i></span> }
						{ ranking === 2 && hasWltpData && <span className='icon ranking bronze'><i className='fas fa-trophy'></i></span> }
						<Heading size={4}> {`${ranking + 1}. ${model.model.name } `} </Heading>
						<Heading size={6}> {model.type.name} </Heading>
						<Heading size={8}> {average} </Heading>
					</Card.Header>
					<Card.Content>
						<Media>
							<Media.Item>
							</Media.Item>
						</Media>
						<div>
							{	hasWltpData
									?
									<div className='has-wltp-data-wrapper'>
										<div className='compare-model-value'>
											<span onClick={ this.showMore }> <Icon icon="angle-down" /> View more </span>
										</div>
										<div>
											{`Weight of Car ${generalData.value.toFixed(2)} ${generalData.unit}`}
										</div>
										<div>
											{`Fuel Type`}
										</div>
									</div>
									: <NoData/>
							}
							{ shouldShowMore
								? <Interpolation
									key={ranking}
									data={ phases.map( phase => getInterpolations({ model: model, compareMode, phase}))}
									compareMode={ compareMode }
								/>
								: null
							}
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
						> configure </Button>
					</Card.Content>
				</Card>
		)
	}
}

export default InfoCard
