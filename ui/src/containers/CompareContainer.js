import React, { Component } from 'react'
import axios from 'axios'
import getLocalStorage from '../modules/localStorage'
import Redirect from 'react-router-dom/Redirect'
import { Loader, Section, Container, Heading } from 'react-bulma-components/full'
import Dashboard from '../components/Dashboard'
import BarChart from '../components/BarChart'
import OptionsContainer from './OptionsContainer'
import isBefore from 'date-fns/is_before'
import addDays from 'date-fns/add_days'

import '../style/compareContainer.css'

class CompareContainer extends Component {

    constructor(props) {
			super(props)
			this.state = {
				configurations : null,
				compareMode : 'CO2',
				modalIsOpen: false,
				modalContent: {},
				ls : null,
				loading: true,
				error: false
			}

			this.phases = [
				{ key : 'LOW', color : '#4caf50', label : 'Low' },
				{ key : 'MEDIUM', color : '#ffeb3b', label : 'Medium' },
				{ key : 'HIGH', color : '#ff9800', label : 'High' },
				{ key : 'EXTRA_HIGH', color : '#f44336', label : 'Extra High' },
				{ key : 'COMBINED', color : '#1565c0', label : 'Combined' }
			]

			this.loadConfigs = this.loadConfigs.bind(this)
	}

	async loadConfigs(ls, selectedModels) {

		let localConfigs = []
		let remoteConfigs = []

		const selectedModelsArr = Object.keys(selectedModels).map(
			key => ({
				id: key,
				name : selectedModels[key].modelName,
				type : {
					id : selectedModels[key].type.id,
					name : selectedModels[key].type.name
			}}))

			try {
				// - Look for configs based on type id in local storage
				const ls_configResults = await Promise.all(
					selectedModelsArr.map(model =>
						ls.find({ selector : { _id : model.type.id } })) )
				
				// - Triage which exist in local storage, which need to be fetched
				ls_configResults.forEach( ({ docs }, i) =>
					docs.length && isBefore(docs[0].expirationDate, addDays(new Date(), 1))
					? localConfigs.push(docs[0])
					: remoteConfigs.push(selectedModelsArr[i]))

				if (remoteConfigs.length) {
					// - Fetch remote configurations
					const remoteConfigsRes = await axios.post('/api/makeConfigurations', remoteConfigs)
					const remoteConfigsData = remoteConfigsRes.data

					// - Save them to local storage
					remoteConfigs = remoteConfigsData.newConfigurations.map(remoteConfig => ({
						_id : remoteConfig.model.type.id,
						...remoteConfig
					}))
				
					await ls.bulkDocs(remoteConfigs)
				}
				
				//reassociate types and models
				const finalConfigs = [...remoteConfigs, ...localConfigs]
				
				return (finalConfigs)

			} catch (e) {
				return (e)
			}
	}

	async componentDidMount() {
		window.scrollTo(0, 0)

		const urlData = this.props.location.pathname.split('/')
		const selectedModels = JSON.parse(decodeURIComponent(urlData[4]))

		try {
			
			const ls = getLocalStorage('vw_okapi')
			const configurationsArr = await this.loadConfigs(ls, selectedModels)
			let configurations = {}

			configurationsArr.forEach(config => {
				
				configurations[config.model.id] = {
					model : config.model,
					configId : config.configId,
					type : selectedModels[config.model.id].type,
					selectedOptions : config.selectedOptions,
					defaultOptions : config.defaultOptions,
					build : config.build,
					wltp : config.wltp,
					images : config.images
				}
			})

			this.setState({ ls, configurations, loading: false })

		} catch (e) {

			this.setState({ loading: false, error : e })

		}
	}

	setCompareMode = compareMode => this.setState({ compareMode })

	closeModal = () => this.setState({ modalIsOpen: false })
	
	openConfiguration = nextConfig =>
		this.setState ({
			modalIsOpen: true,
			currentConfig : nextConfig
		})

	render() {

		const {
			configurations,
			compareMode,
			modalIsOpen,
			currentConfig,
			loading,
			error,
			ls
		} = this.state

		const urlData = this.props.location.pathname.split('/')

		if (loading)
			return (
				<div className='loaders'>
					<Loader
					style={{
						borderTopColor: 'transparent',
						boderRightColor: 'transparent',
					}}
					message={'Getting configurations...'} />
				</div>
			)
		
		if (error) {
			return (
				<Redirect to='/not-found' />
			)
		}

		let renderBarChart = false
		Object.keys(configurations).forEach( modelId => {
			if (configurations[modelId].wltp.length)
				renderBarChart = true
		})

		console.log('configurations', configurations)

		const carNames = Object.keys(configurations).map(modelId => configurations[modelId].model.name)

		return (
			<div className='compare-container-wrapper'>
				<Section>
					<Container className="compareContain">
					<Heading size={4} className='has-text-centered'>
						Model Emissions Comparison
					</Heading>
					<p>We're looking at WLTP data for the cars you selected:&nbsp;
						{carNames.map( (name, i) =>
								<span key={`car_name_${i}`}>
									<strong>
										{`${name}${i < carNames.length - 1 ? ', ' : ''}`}
									</strong>
								</span>
							)}.
							The WLTP driving cycle is divided into four parts with different average speeds: low, medium, high and extra high. Each part contains a variety of driving phases, stops, acceleration and braking phases. For a certain car type, each powertrain configuration is tested with WLTP for the car’s lightest (most economical) and heaviest (least economical) version.</p>
					<div className='button-wrapper'>
						<div>
							<span><strong>Compare by: </strong></span>
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
					{
						renderBarChart 
						? <BarChart
							configurations={ configurations }
							compareMode={ compareMode }
							phases={ this.phases }
						/>
						: null
					}
					<hr className='divider'/>
					<Heading size={4} className='has-text-centered'>
						Model Ranking
					</Heading>
					<Dashboard
						configurations={ configurations }
						compareMode={ compareMode }
						openConfiguration= { this.openConfiguration }
						phases={ this.phases }
					/>
					{modalIsOpen &&
						<OptionsContainer
							ls={ls}
							currentConfig={currentConfig}
							isOpen={modalIsOpen}
							closeModal={ this.closeModal }
							countryCode={ urlData[2] }
							selectedOptions={ console.log(currentConfig) || configurations[currentConfig.model.id].selectedOptions.map( option => option.id) }
						/>}
					</Container>
				</Section>
			</div>
		)
	}
}

export default CompareContainer
