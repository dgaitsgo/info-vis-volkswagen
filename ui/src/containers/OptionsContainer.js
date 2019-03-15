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
			error : null,
			isOpen : true,
			loading: null,
			allChoices : [],
			selectedOptions : [],
			mode : this.modes.SELECT_OPTIONS,
			invalidOptions : []
		}

		this.tryBuilding = this.tryBuilding.bind(this)
	}

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

	recoverOptions = (configId, recoverOptions) =>
		axios.get('/api/recoverOptions', {
			params : {
				configId,
				recoverOptions
			}
		})

	async componentDidMount() {
		
		const { currentConfig } = this.props

		const configChoicesRes = await this.configChoices(currentConfig.configId)
		const choices = configChoicesRes.data.choices
		const flatChoices = this.flattenChoices(choices)

		this.setState({ allChoices : choices, flatChoices, selectedOptions : currentConfig.selectedOptions.map(option => option.id ) })
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

		const { configId } = this.props
		const recoverRes = await this.recoverOptions(configId, selectedOptions)
		const invalidOptions = recoverRes.data.options

		if (invalidOptions.length) {
			this.setState({
				mode : this.modes.RECOVER_CONFIG, 
				invalidOptions
			})
		} else {

			this.props.refreshConfig()
		}

	}

	render() {

		const {
			error,
			allChoices,
			flatChoices,
			loading,
			invalidOptions,
			selectedOptions,
			mode
		} = this.state

		const {
			currentConfig	
		} = this.props

		return (
			<Options
				selectedOptions={selectedOptions}
				invalidOptions={invalidOptions}
				mode={mode}
				error={error}
				loading={loading}
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
