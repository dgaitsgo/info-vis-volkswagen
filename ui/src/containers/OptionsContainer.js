import React, { Component } from 'react'
import axios from 'axios'
import Options from '../components/Options'

class OptionsContainer extends Component {

	constructor(props) {

		super(props)

		this.loadingEnum = {
			CONFIG : 'Checking config',
			CHOICES : 'Loading choices',
			ADD : 'Adding option',
			REMOVE : 'Removing option',
			BUILD : 'Checking build',
			REBUILD : 'Rebuilding configuration',
		}

		this.state = {
			currentConfig : props.currentConfig,
			error : null,
			isOpen : true,
			loading: null
		}

		this.handleAddOption = this.handleAddOption.bind(this)
		this.handleRebuildConfig = this.handleRebuildConfig.bind(this)
		this.handleRemoveOption = this.handleRemoveOption.bind(this)
		this.preHandleAddOption = this.preHandleAddOption.bind(this)
		this.preHandleRemoveOption = this.preHandleRemoveOption.bind(this)
	}

	replaceOptions = (configId, options) =>
		axios.get('/api/replaceOptions', {
			params : {
				configId,
				options
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

	async preHandleAddOption(optionId) {
		this.setState({ loading : this.loadingEnum.ADD }, () => this.handleAddOption(optionId))
	}

	async handleAddOption(optionId) {

		let { currentConfig } = this.state
		const { ls } = this.props

			try {
				//Add option
				const nextOptionsRes = await this.addOption(currentConfig.configId, optionId)
				const nextOptions = nextOptionsRes.data.options
			
				//check build
				const buildRes = await this.checkBuild(currentConfig.configId)
				const build = buildRes.data.build

				//update configuration
				currentConfig.selectedOptions = nextOptions
				currentConfig.build = build
			
				//insert in local storage and get revision
				const rev = await ls.insert(currentConfig)
				
				currentConfig.rev = rev
				currentConfig._rev = rev

				this.setState({ currentConfig, loading: null })

			} catch (e) {

				this.setState({ loading : null, error : { message : 'Could not add option.' } })
		}
	}

	async preHandleRemoveOption(optionId) {
		this.setState({ loading : this.loadingEnum.REMOVE }, () => this.handleRemoveOption(optionId))
	}

	async handleRemoveOption(optionId) {
	
		let { currentConfig } = this.state
		const { ls } = this.props

		try {

			//remove option
			const nextOptionsRes = await this.removeOption(currentConfig.configId, optionId)
			const nextOptions = nextOptionsRes.data.options
		
			//check build
			const buildRes = await this.checkBuild(currentConfig.configId)
			const build = buildRes.data.build

			//update configuration
			currentConfig.selectedOptions = nextOptions
			currentConfig.build = build

			//insert in local storage and get revision
			const rev = await ls.insert(currentConfig)

			currentConfig.rev = rev
			currentConfig._rev = rev

			this.setState({ currentConfig })

		} catch (e) {
			this.setState({ loadiing : false, error : { e, message : 'Could not remove option.' } })
		}
	}


	async handleRebuildConfig() {

		let { currentConfig } = this.state
		const { ls } = this.props

		try {

			//replace options
			const nextOptionsRes = await this.replaceOptions(currentConfig.configId, currentConfig.defaultOptions)
			const nextOptions = nextOptionsRes.data

			//check build
			const buildRes = await this.checkBuild(currentConfig.configId)
			const build = buildRes.data.build

			// update current config
			currentConfig.selectedOptions = nextOptions
			currentConfig.build = build

			//save to local storage
			const rev = await ls.insert(currentConfig)

			currentConfig.rev = rev
			currentConfig._rev = rev

			this.setState({ currentConfig })


		} catch (e) {
			this.setState({ error : { e, message : 'Could not rebuild configuration.' } })	
		}
	}


	async componentDidMount() {
		
		const { currentConfig } = this.state

		const configChoicesRes = await this.configChoices(currentConfig.configId)
		const choices = configChoicesRes.data.choices
		const flatChoices = this.flattenChoices(choices)

		this.setState({ allChoices : choices, flatChoices })

	}

	flattenChoices () {

		if (!this.state.currentConfig)
			return null

		const { choices } = this.state.currentConfig

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
				onClickRebuild={this.handleRebuildConfig}
				flatChoices={flatChoices}
				allChoices={allChoices}
				currentConfig={currentConfig}
			/>
		)
	}
}

export default OptionsContainer
