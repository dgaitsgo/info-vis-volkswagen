import React, { Component } from 'react'
import axios from 'axios'
import getLocalStorage from '../modules/localStorage'
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

		this.loadingEnum = {
			CONFIG : 'Checking config...',
			CHOICES : 'Loading choices...',
			ADD : 'Adding option...',
			REMOVE : 'Removing option...',
			BUILD : 'Checking build...',
			RESTORE : 'Restoring configuration...',
		}

		this.handleAddOption = this.handleAddOption.bind(this)
		this.handleRemoveOption = this.handleRemoveOption.bind(this)
		this.handleRestoreOptions = this.handleRestoreOptions.bind(this)

		this.preHandleRestoreOptions = this.preHandleRestoreOptions.bind(this)
		this.preHandleAddOption = this.preHandleAddOption.bind(this)
		this.preHandleRemoveOption = this.preHandleRemoveOption.bind(this)
	
		this.refreshConfig = this.refreshConfig.bind(this)

		this.phases = [
			{ key : 'LOW', color : '#4caf50', label : 'Low' },
			{ key : 'MEDIUM', color : '#fdd835', label : 'Medium' },
			{ key : 'HIGH', color : '#ff9800', label : 'High' },
			{ key : 'EXTRA_HIGH', color : '#f44336', label : 'Extra High' },
			{ key : 'COMBINED', color : '#1565c0', label : 'Combined' }
		]

		this.loadConfigs = this.loadConfigs.bind(this)
	}

	getWltp = configId =>
		axios.get('/api/wltp', {
			params : {
				configId
			}
		})

	getImages = configId =>
		axios.get('/api/images', {
			params : {
				configId
			}
		})

	restoreOptions = (configId, optionIds) =>
		axios.get('/api/restoreOptions', {
			params : {
				configId,
				optionIds : JSON.stringify(optionIds)
			}
		})

	configChoices = (configId) =>
		axios.get('/api/configChoices', {
			params : {
				configId
			}
		})

	createConfig = (modelId, options) =>
		axios.get('/api/newConfiguration', {
			params : {
				model_id : modelId,
				options
			}
		})

	checkBuild = configId =>
		axios.get('/api/checkBuild', {
			params : {
				configId
			}
		})

	removeOption = (configId, optionId) =>
		axios.get('/api/removeOption', {
			params : {
				configId,
				optionId
			}
		})

	addOption = (configId, optionId) =>
		axios.get('/api/addOption', {
			params : {
				configId,
				optionId
			}
		})

	//After every option change, 
	async refreshConfig(currentConfig) {

		const { ls } = this.state

		//check build status
		const buildRes = await this.checkBuild(currentConfig.configId)
		const build = buildRes.data.build

		currentConfig.build = build

		//if valid build
		if (build.buildable && build.distinct) {
			
			//get images
			const imagesRes = await this.getImages(currentConfig.configId)
			currentConfig.images = imagesRes.data.images

			//get wltp
			const wltpRes = await this.getWltp(currentConfig.configId)
			currentConfig.wltp = wltpRes.data.wltp	

		} else {

			currentConfig.images = []
			currentConfig.wltp = []
		}

		//save to local storage
		const rev = await ls.insert(currentConfig)

		currentConfig.rev = rev
		currentConfig._rev = rev

		this.setState({
			loading : false,
			currentConfig,
		})
	}

	async preHandleAddOption(optionId) {
		this.setState({ loading : this.loadingEnum.ADD }, () => this.handleAddOption(optionId))
	}

	async handleAddOption(optionId) {

		let { currentConfig } = this.state

		try {

			//Add option
			const nextOptionsRes = await this.addOption(currentConfig.configId, optionId)
			const nextOptions = nextOptionsRes.data.options

			//update selected options
			currentConfig.selectedOptions = nextOptions

			this.refreshConfig(currentConfig)

		} catch (e) {

			this.setState({ loading : null, error : { message : 'Could not add option.' } })
		}
	}

	async preHandleRemoveOption(optionId) {
		this.setState({ loading : this.loadingEnum.REMOVE }, () => this.handleRemoveOption(optionId))
	}

	async handleRemoveOption(optionId) {
	
		let { currentConfig } = this.state

		try {

			//remove option
			const nextOptionsRes = await this.removeOption(currentConfig.configId, optionId)
			const nextOptions = nextOptionsRes.data.options
		
			//update next options
			currentConfig.selectedOptions = nextOptions

			this.refreshConfig(currentConfig)

		} catch (e) {

			this.setState({ loading : null, error : { message : 'Could not remove option.' } })
		}
	}

	async preHandleRestoreOptions() {
		this.setState({ loading : this.loadingEnum.RESTORE }, () => this.handleRestoreOptions())
	}

	async handleRestoreOptions() {

		let { currentConfig } = this.state

		try {

			//replace options
			const nextOptionsRes = await this.restoreOptions(currentConfig.configId, currentConfig.defaultOptions)
			const nextOptions = nextOptionsRes.data.options

			// update current config
			currentConfig.selectedOptions = nextOptions
			currentConfig.defaultOptions = nextOptions

			this.refreshConfig(currentConfig)

		} catch (e) {

			this.setState({ loading: false, error : { e, message : 'Could not restore configuration.' } })	
		}
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
					images : config.images,
				}
			})

			this.setState({ ls, urlData, configurations, loading: false })

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
			ls,
			urlData
		} = this.state

		if (loading)
			return (
				<div className='loaders'>
					<Loader
						style={{
							borderTopColor: 'transparent',
							boderRightColor: 'transparent',
						}}
					/>
					<Heading className='loader-msg' size={4}>Building Configurations...</Heading>
				</div>
			)

		let renderBarChart = false
		Object.keys(configurations).forEach( modelId => {
			if (configurations[modelId].wltp.length)
				renderBarChart = true
		})

		const carNames = Object.keys(configurations).map(modelId => configurations[modelId].model.name)

		return (
			<div className='compare-container-wrapper'>
				<Section>
					<Container className='container-wrapper'>
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
							If you don't know about WLTP read more about it <a rel='noopener noreferrer' target='_blank' href='http://wltpfacts.eu/what-is-wltp-how-will-it-work/'>here</a>.
						</p>
						{ renderBarChart 
							? <div className='button-wrapper'>
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
							: <div>
								<hr/>
								OKAPI does not provide WLTP data for all of the selected models. For the full experience select different models or check out this <a href='/explore/DE/c65e5000-a5e0-5556-89e9-172a33f8f344/%7B%22eea4772a-8579-56a0-bcae-3e630cc2fe9c%22%3A%7B%22modelName%22%3A%22A3%20Sedan%22%2C%22type%22%3A%7B%22name%22%3A%22%2030%20TFSI%20(%23)%2085(116)(%23)%20kW(PS)(%23)%206-Gang(%23)%22%2C%22id%22%3A%226c601c96-9b1f-5f63-95c7-44d0ac32b49b%22%7D%7D%2C%227f226e25-10db-5c11-8b2e-2f0e1c377b9a%22%3A%7B%22modelName%22%3A%22A1%20Sportback%22%2C%22type%22%3A%7B%22name%22%3A%22S%20line%2030%20TFSI%20(%23)%2085(116)(%23)%20kW(PS)(%23)%206-Gang(%23)%22%2C%22id%22%3A%2207de2820-adab-5c1b-95ae-dae434863700%22%7D%7D%2C%221ce70e46-91c3-5528-a7f7-4faf1ba79226%22%3A%7B%22modelName%22%3A%22Q8%22%2C%22type%22%3A%7B%22name%22%3A%22%2050%20TDI%20quattro(%23)%20210(286)(%23)%20kW(PS)(%23)%20tiptronic(%23)%22%2C%22id%22%3A%22ba66f6c1-815d-5ff4-878a-4cbd809bdab6%22%7D%7D%7D'>example</a>.
							</div>
						}
						{ renderBarChart
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
								addOption={this.preHandleAddOption}
								removeOption={this.preHandleRemoveOption}
								restoreOptions={this.preHandleRestoreOptions}
								currentConfig={currentConfig}
								isOpen={modalIsOpen}
								closeModal={ this.closeModal }
								countryCode={ urlData[2] }
								selectedOptions={ configurations[currentConfig.model.id].selectedOptions.map( option => option.id) }
							/>}
					</Container>
				</Section>
			</div>
		)
	}
}

export default CompareContainer
