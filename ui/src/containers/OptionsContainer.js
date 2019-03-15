import React, { Component } from 'react'
import axios from 'axios'
import Options from '../components/Options'
import '../style/options.css'

class OptionsContainer extends Component {

	constructor(props) {

		super(props)

		this.modes = {
			SELECT_OPTIONS : 'SELECT_OPTIONS',
			RECOVER_CONFIG : 'RECOVER_CONFIG'
		}

		this.state = {
			currentConfig : this.props.currentConfig,
			error : null,
			isOpen : true,
			loading: null,
			allChoices : [],
			selectedOptions : [],
			mode : this.modes.SELECT_OPTIONS,
			invalidOptions : []
		}

		this.refreshConfig = this.refreshConfig.bind(this)
		this.tryBuilding = this.tryBuilding.bind(this)
	}

	checkBuild = configId =>
		axios.get('/api/checkBuild', {
			params : {
				configId
			}
		})

	toggleOption = optionId => {

		let { selectedOptions } = this.state
		const idx = selectedOptions.indexOf(optionId)

		idx === -1
			? selectedOptions.push(optionId) 
			: selectedOptions.splice(idx, 1)

		this.setState({ selectedOptions })
	}

	configChoices = configId =>
		axios.get('/api/configChoices', {
			params : {
				configId
			}
		})
	
	replaceOptions = (configId, optionIds) =>
		axios.get('/api/replaceOptions', {
			params : {
				configId,
				optionIds,
			}
		})


	recoverOptions = configId =>
		axios.get('/api/recoverOptions', {
			params : {
				configId
			}
		})
	
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

	async componentDidMount() {
		
		try {

			const { currentConfig } = this.state

			const configChoicesRes = await this.configChoices(currentConfig.configId)
			const choices = configChoicesRes.data.choices
			const flatChoices = this.flattenChoices(choices)

			this.setState({ allChoices : choices, flatChoices, selectedOptions : currentConfig.selectedOptions.map(option => option.id ) })

		} catch(e) {

			this.setState({ loading : null, error : { err : e, message : 'Could not load choices.' } })
		}
	}

	async refreshConfig(currentConfig) {

		try {

			const { ls } = this.props

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

			currentConfig.id = currentConfig.model.type.id
			currentConfig._id = currentConfig.model.type.id

			//save to local storage
			const rev = await ls.insert(currentConfig)

			currentConfig.rev = rev
			currentConfig._rev = rev

			this.setState({ loading : null, currentConfig })

		} catch (e) {

			this.setState({ loading : null,  error : { err : e, message : 'Coult not refresh configuration' }})
		}
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

	async tryBuilding(selectedOptions) {

		let {
			currentConfig,
		} = this.state

		const {
			ls
		} = this.props

		this.setState({
			loading : 'Checking build...'
		}, async () => {
		
			await this.replaceOptions(currentConfig.configId, selectedOptions.map(optionId => ({ id : optionId })))

			const recoverRes = await this.recoverOptions(currentConfig.configId)
			const invalidOptions = recoverRes.data.options

			const buildRes = await this.checkBuild(currentConfig.configId)
			const build = buildRes.data.build

			currentConfig.build = build

			const rev = await ls.insert(currentConfig)

			currentConfig.rev = rev
			currentConfig._rev = rev

			if (invalidOptions.length) {
				this.setState({
					currentConfig,
					loading : null,
					mode : this.modes.RECOVER_CONFIG, 
					invalidOptions : invalidOptions.map(option => option.id)
				})

			} else {

				this.refreshConfig(currentConfig)
			}

		})
	}

	render() {

		const {
			error,
			allChoices,
			flatChoices,
			loading,
			invalidOptions,
			selectedOptions,
			mode,
			currentConfig
		} = this.state

		return (
			<Options
				selectedOptions={selectedOptions}
				invalidOptions={invalidOptions}
				mode={mode}
				error={error}
				loading={error ? false : loading}
				closeModal={this.props.closeModal}
				isOpen={this.props.isOpen}
				toggleOption={this.toggleOption}
				onDone={this.tryBuilding}
				restoreOptions={this.props.restoreOptions}
				flatChoices={flatChoices}
				allChoices={allChoices}
				currentConfig={currentConfig}
			/>
		)
	}
}

export default OptionsContainer
