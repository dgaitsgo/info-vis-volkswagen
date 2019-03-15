import React, { Component } from 'react'
import axios from 'axios'
import Options from '../components/Options'
import '../style/options.css'

class OptionsContainer extends Component {

	constructor(props) {

		super(props)

		this.loadingEnum = {
			CONFIG : 'Checking config',
			CHOICES : 'Loading choices',
			ADD : 'Adding option',
			REMOVE : 'Removing option',
			BUILD : 'Checking build',
			RESTORE : 'Restoring configuration',
		}

		this.state = {
			currentConfig : props.currentConfig,
			error : null,
			isOpen : true,
			loading: null,
			allChoices : []
		}

		this.handleAddOption = this.handleAddOption.bind(this)
		this.handleRemoveOption = this.handleRemoveOption.bind(this)
		this.handleRestoreOptions = this.handleRestoreOptions.bind(this)

		this.preHandleRestoreOptions = this.preHandleRestoreOptions.bind(this)
		this.preHandleAddOption = this.preHandleAddOption.bind(this)
		this.preHandleRemoveOption = this.preHandleRemoveOption.bind(this)

	
		this.refreshConfig = this.refreshConfig.bind(this)
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

		const { ls } = this.props

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

		// get next choices
		const configChoicesRes = await this.configChoices(currentConfig.configId)
		const choices = configChoicesRes.data.choices
		const flatChoices = this.flattenChoices(choices)

		this.setState({
			loading : false,
			currentConfig,
			choices,
			flatChoices
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


	async componentDidMount() {
		
		const { currentConfig } = this.state

		const configChoicesRes = await this.configChoices(currentConfig.configId)
		const choices = configChoicesRes.data.choices
		const flatChoices = this.flattenChoices(choices)

		console.log('flatten choices', flatChoices)

		this.setState({ allChoices : choices, flatChoices })
	}

	flattenChoices (choices) {

		let flatChoices = {}

		choices.forEach(category => {

			const label = category.description.length ? category.description : category.id

			category.valid.forEach( validOption => {

				flatChoices[validOption.id] = {
					id : validOption.id,
					valid : true,
					choiceDescription : validOption.description,
					categoryDescription : label
				}
			})

			category.invalid.forEach( invalidOption => {

				flatChoices[invalidOption.id] = {
					id : invalidOption.id,
					valid : false,
					choiceDescription : invalidOption.description,
					categoryDescription : label
				}
			})
		})

		return (flatChoices)
	}

	render() {

		const {
			error,
			currentConfig,
			allChoices,
			flatChoices,
			loading
		} = this.state

		return (
			<Options
				error={error}
				loading={loading}
				closeModal={this.props.closeModal}
				isOpen={this.props.isOpen}
				addOption={this.preHandleAddOption}
				removeOption={this.preHandleRemoveOption}
				restoreOptions={this.preHandleRestoreOptions}
				flatChoices={flatChoices}
				allChoices={allChoices}
				currentConfig={currentConfig}
			/>
		)
	}
}

export default OptionsContainer
