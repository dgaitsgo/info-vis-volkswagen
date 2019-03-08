import React, { Component } from 'react'
import _ from 'lodash'
import { Box, Button, Icon, Card, Heading, Media, Image } from 'react-bulma-components/full'

import '../style/dashboard.css'
import { compare } from 'ltgt';

const Interpolation = ({ data }) => {
	console.log(data)
	return (
		<div>
			{data.map( entry => {

				return (
					<div>
						<span> <font color={`${entry.phase.color}`}> {entry.phase.label} </font> {entry.value} </span>
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
			shouldDisplayRank,
			model,
			compareMode,
			openConfiguration,
			getInterpolations,
			phases,
			average
		} = this.props

		return (
				<Card className='compare-model-wrapper'>
					<Card.Header>
						{ ranking === 0 && shouldDisplayRank && <span className='icon ranking gold'><i className='fas fa-trophy'></i></span> }
						{ ranking === 1 && shouldDisplayRank && <span className='icon ranking silver'><i className='fas fa-trophy'></i></span> }
						{ ranking === 2 && shouldDisplayRank && <span className='icon ranking bronze'><i className='fas fa-trophy'></i></span> }
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
							<div className='compare-model-value'>
								<span
									onClick={ this.showMore }
								> + </span>
								{	shouldDisplayRank
										? 'average ' + compareMode + ' ' + average
										: 'No data found'
								}
							</div>
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
