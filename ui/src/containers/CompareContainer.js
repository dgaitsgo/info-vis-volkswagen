import React, { Component } from 'react'
import axios from 'axios'
import { Loader, Section, Container, Heading } from 'react-bulma-components/full'
import Dashboard from '../components/Dashboard'
import BarChart from '../components/BarChart'
import OptionsContainer from './OptionsContainer'

import '../style/compareContainer.css'

class CompareContainer extends Component {

    constructor(props) {
		super(props)
        this.state = {
			defaultModels : null,
			compareMode : 'CO2',
			modalIsOpen: false,
			isTyping: true,
			modalContent: {},
		}

		this.phases = [
			{ key : 'LOW', color : '#4caf50', label : 'Low' },
			{ key : 'MEDIUM', color : '#ffeb3b', label : 'Medium' },
			{ key : 'HIGH', color : '#ff9800', label : 'High' },
			{ key : 'EXTRA_HIGH', color : '#f44336', label : 'Extra High' },
			{ key : 'COMBINED', color : '#1565c0', label : 'Combined' }
		]
	}

	async componentDidMount() {

		const urlData = this.props.location.pathname.split('/')
		const selectedModels = JSON.parse(decodeURIComponent(urlData[4]))
		const selectedModelsIds = Object.keys(selectedModels).map( key => ({ id: key, name: selectedModels[key].modelName, typeId: selectedModels[key].type.id}))

		const defaultModelsRes = await axios.get('/api/defaultModels', {
			params : {
				models: selectedModelsIds
			}
		})

		let defaultModelsArr = defaultModelsRes.data
		let defaultModels = {}

		//reassociate types and models
		defaultModelsArr.forEach( (model, i) =>
			defaultModels[model.model_id] =  {
				model,
				type : selectedModels[model.model_id].type
		})
		this.setState({ defaultModels })
	}

	setCompareMode = compareMode => this.setState({ compareMode })

	closeModal = () => this.setState({ modalIsOpen: false })

	openConfiguration = ({ modelId, modelName, typeName, typeId }) => {
		this.setState({ modalIsOpen: true,
			model: {
				name: modelName,
				id: modelId,
				type: {
					name: typeName,
					id: typeId
				},
			} })
	}

	render() {

		const {
			defaultModels,
			compareMode,
			modalIsOpen,
			model
		} = this.state

		const urlData = this.props.location.pathname.split('/')

		if (!defaultModels)
			return (
				<div className='loaders'>
					<Loader
					style={{
						position:'fixed',
						width:300,
						height:300,
						border: '4px solid #023268',
						borderTopColor: 'transparent',
						boderRightColor: 'transparent',
						margin: 'auto',
						top: '-50px',
						left: 0,
						bottom: 0,
						right: 0
					}}
					message={'Getting configurations...'} />
				</div>
			)
		return (
			<div className='compare-container-wrapper'>
				<Section>
					<Container className="compareContain">
					<Heading size={4} className='has-text-centered'>
						Model Comparison
					</Heading>
					<p>The WLTP driving cycle is divided into four parts with different average speeds: low, medium, high and extra high. Each part contains a variety of driving phases, stops, acceleration and braking phases. For a certain car type, each powertrain configuration is tested with WLTP for the car’s lightest (most economical) and heaviest (least economical) version.</p>
					<div className='button-wrapper'>
						<div>
							<span><strong>Sort by: </strong></span>
							<label className='field'>CO<sub>2</sub> Emissions
								<input
									onChange={() => this.setCompareMode('CO2')}
									className='is-checkradio'
									type='radio'
									checked={compareMode === 'CO2'}
								/>
								<span className='checkmark'></span>
							</label>
							<label className='field'>Fuel Consumption
								<input
									onChange={() => this.setCompareMode('CONSUMPTION')}
									className='is-checkradio'
									type='radio'
									checked={compareMode === 'CONSUMPTION'} />
									<span className='checkmark'></span>
							</label>
						</div>
					</div>
					<Heading size={5} className='has-text-centered'>
						Bar Chart Title Goes Here
					</Heading>
					<BarChart
						defaultModels={ defaultModels }
						compareMode={ compareMode }
						phases={ this.phases }
					/>
					<hr className='divider'/>
					<Heading size={4} className='has-text-centered'>
						Model Ranking
					</Heading>
					<Dashboard
						defaultModels={ defaultModels }
						compareMode={ compareMode }
						openConfiguration= { this.openConfiguration }
						phases={ this.phases }
					/>
					{modalIsOpen &&
						<OptionsContainer
							isOpen={modalIsOpen}
							closeModal={ this.closeModal }
							model={model}
							countryCode={ urlData[2] }
							defaultOptions={defaultModels[model.id].model.defaultOptions}
						/>}
					</Container>
				</Section>
			</div>
		)
	}
}

export default CompareContainer
