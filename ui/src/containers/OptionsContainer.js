import React, { Component } from 'react'
import axios from 'axios'
import Error from '../components/Error'
import '../style/optionsContainer.css'
import { Alert } from 'rsuite'
import getLocalStorage from '../modules/localStorage'
import isBefore from 'date-fns/is_before'
import addDays from 'date-fns/add_days'
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
			currentConfig : null,
			error : null,
			isOpen : true
		}

		this.handleAddOption = this.handleAddOption.bind(this)
		this.handleRebuildConfig = this.handleRebuildConfig.bind(this)
		this.handleRemoveOption = this.handleRemoveOption.bind(this)
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
	{
		console.log('removeOption call')
		axios.get('/api/removeOption', {
			params : {
				configId,
				optionId
			}
		})
	}

	addOption = (configId, optionId) =>
	{
		console.log('addOption call')
		axios.get('/api/addOption', {
			params : {
				configId,
				optionId
			}
		})
	}

	//Only show options that appear in the type and are valid for the configuration
	/*
		flatten configuration options

		target data set:
		option : {
			valid : boolean,
			id : string,
			optionDescription : string,
			categoryDescription : string
		}
			selectedOptions: defaultOptions.map( option => option.id),

		filter by looking up ids in type options

	*/

	async handleAddOption(optionId) {

		let {
			currentConfig,
			ls
		} = this.state

		Alert.info(this.loadingEnum.ADD)

		try {

			//Add option
			const nextOptionsRes = await this.addOption(currentConfig.configId, optionId)
			const nextOptions = nextOptionsRes.data.nextOptions

			//check build
			Alert.info(this.loadingEnum.BUILD)
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

			this.setState({ error : { e, message : 'Could not add option.' } })
		}
	}

	async handleRemoveOption(optionId) {

		let {
			currentConfig,
			ls
		} = this.state

		Alert.info(this.loadingEnum.REMOVE)

		try {

			//remove option
			const nextOptionsRes = await this.removeOption(currentConfig.configId, optionId)
			const nextOptions = nextOptionsRes.data.data

			//check build
			Alert.info(this.loadingEnum.BUILD)
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
			this.setState({ error : { e, message : 'Could not remove option.' } })
		}
	}


	async handleRebuildConfig() {

		let {
			currentConfig,
			ls
		} = this.state

		const {
			defaultOptions
		} = this.props

		Alert.info(this.loadingEnum.REBUILD)

		try {

			//replace options
			const nextOptionsRes = await this.replaceOptions(currentConfig.configId, defaultOptions)
			const nextOptions = nextOptionsRes.data

			//check build
			Alert.info(this.loadingEnum.BUILD)
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


	/***
	 * check in local storage first if user has already configured this model
		and that it's been less than 24 hours since creation.
		Else, create a configuration with default options and save it to local storage
		target data : {
			configId : string
			model : Model
			type : string type_id
			options : [Options]
			expirationDate : Date
		}*/

	async getConfig(ls, model, defaultOptions) {

		try {

			const ls_modelRes = await ls.find({ selector : { id : model.id }})

			if (ls_modelRes.docs.length && isBefore(ls_modelRes.docs[0].expirationDate, addDays(new Date(), 1)) ) {

				const currentConfig = ls_modelRes.docs[0]

				return (currentConfig)

			} else {

				// else create a configuration and save to local storage
				Alert.info(this.loadingEnum.CONFIG)
				const newConfigRes = await this.createConfig(model.id, defaultOptions)
				const newConfig = newConfigRes.data.newConfiguration

				Alert.info(this.loadingEnum.BUILD)
				const buildRes = await this.checkBuild(newConfig.id)
				const build = buildRes.data.build

				Alert.info(this.loadingEnum.CONFIG_CHOICES)
				const configChoicesRes = await this.configChoices(newConfig.id)
				const choices = configChoicesRes.data.choices

				const currentConfig = {
					id : model.id,
					_id : model.id,
					configId : newConfig.id,
					expirationDate : newConfig.expirationDate,
					model : this.props.model,
					selectedOptions : defaultOptions,
					choices,
					build
				}

				// Local storage variables to track revision
				const rev = await ls.insert(currentConfig)

				currentConfig.rev = rev
				currentConfig._rev = rev

				return (currentConfig)
			}
		} catch (e) {
			console.log(e)
		}
	}

	async componentDidMount() {

		const {
			model,
			defaultOptions
		} = this.props

		try {

			const ls = getLocalStorage('vw_okapi')
			const currentConfig = await this.getConfig(ls, model, defaultOptions)

			this.setState({
				currentConfig,
				ls
			})

		} catch (e) {
			this.setState({ error : { e, message : 'Could not load configurations.' } })
		}
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
			closeModal,
			isOpen,
		} = this.props

		return (
			<Options
				flatChoices={this.flattenChoices()}
				closeModal={closeModal}
				isOpen={isOpen}
				addOption={this.handleAddOption}
				removeOption={this.handleRemoveOption}
				onClickRebuild={this.handleRebuildConfig}
				currentConfig={this.state.currentConfig}
			/>
		)
	}
}

export default OptionsContainer
