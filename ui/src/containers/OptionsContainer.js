import React, { Component } from 'react'
import axios from 'axios'
import Redirect from 'react-router-dom/Redirect'
import Error from '../components/Error'
import { Loader, Button, Heading, Box, Columns } from 'react-bulma-components/full'
import Modal from 'react-modal'
import '../style/optionsContainer.css'

const Tags = ({ options, selectedOptions, onRemove }) => {
	return (
		<div className='tags-wrapper'>
			{ options.map( ( option, i) => {
				if (selectedOptions.includes(option.id)){
					return (
						<div className='tag description-tag' key={i}>
							{option.description}
							<span onClick={ () => onRemove({ id: option.id }) } className='tag-close'><i className="fas fa-times"></i></span>
						</div>
					)
				}
			})}
		</div>
	)
}

class OptionsContainer extends Component {

	constructor(props) {

		super(props)

		const {
			defaultOptions
		} = this.props

		this.state = {

			// initially loading all othe choices
			loadingConfigOptions : true,

			//we're reloading the config after every addition and removal of options
			loadingConfig : false,

			loadingCheckBuild : false,

			//all the choices for a configuration
			choices : null,

			// let the user know if the build they have is configurable or not
			build : null,

			//skunz added////
			//all the options a user can choose for a type
			options: [],

			selectedOptions: defaultOptions.map( option => option.id),

			searchedCategories: null,

			//indicading if the options are currently beeing loaded
			loadingOptions: true,

			//represents the selected Category for a type
			selectedCategory: null

		}
	}

	addOption = ({ id }) => {

		let selectedOptions = this.state.selectedOptions

		selectedOptions.push( id )

		this.setState({ selectedOptions })

		// const { configId } = this.props

		// this.setState({ loadingConfig : true }, () => {

		// 	axios.get('/api/addOption', {
		// 		params : {
		// 			configId,
		// 			optionId
		// 		}}).then(res => {

		// 			this.setState({ loadingConfig : false, loadingCheckBuild : true }, () => {
		// 				this.checkBuild()
		// 			})
		// 	})
		// })
		// .catch(err => <Error message={`Could not add option ${optionId}`} />)
	}

	removeOption = ({ id }) => {

		const {
			selectedOptions
		} = this.state

		this.setState({ selectedOptions: selectedOptions.filter( optionId => optionId !== id) })

		// const { configId } = this.props

		// this.setState({ loadingConfig : true }, () => {

		// 	axios.get('/api/removeOption', {
		// 		params : {
		// 			configId,
		// 			optionId
		// 		}}).then(res => {

		// 			this.setState({ loadingConfig : false, loadingCheckBuild : true }, () => {
		// 				this.checkBuild()
		// 			})
		// 		})
		// 		.catch(err => <Error message={`Could not remove option ${optionId}`} />)
		// })
	}

	// rebuildConfig = () => {

	// 	const { configId } = this.props

	// 	this.setState({ loadingConfig : true }, () => {

	// 		axios.get('/api/rebuildConfig', {
	// 			params : {
	// 				configId,
	// 			}}).then(res => {

	// 				this.setState({ loadingConfig : false }, this.getChoices)
	// 			})
	// 			.catch(err => <Error message={`Could not rebuild configuration ${configId}`} />)
	// 	})
	// }

	// checkBuild = () => {

	// 	const { configId } = this.props

	// 	axios.get('/api/checkBuild', {
	// 		params : {
	// 			configId
	// 		}}).then(res => {

	// 			this.setState({ build : res.data })
	// 		})
	// 		.catch(err => <Error message={`Could not rebuild configuration ${configId}`} />)
	// }

	// getChoices = () => {

	// 	const { configId } = this.props

	// 	axios.get('/api/choices', {
	// 		params : { configId }
	// 	}).then(res => {

	// 		this.setState({
	// 			loadingChoices : false,
	// 			options: res.data
	// 		})

	// 	})
	// 	.catch(err => <Error message={`Could not get choices for ${configId}`}/>)
	// }

	getOptions = () => {

		const {
			countryCode,
			model,
		} = this.props

		axios.get('/api/options', {
			params : {
				countryCode,
				type_id: model.type.id
			}
		}).then(res => {
			this.setState({
				loadingOptions : false,
				options: res.data.options.data,
			})
		})
		.catch(err => <Error message={`Could not get options for ${model.type.id}`}/>)
	}

	cancelConfiguration = () => {

	}

	restoreConfiguration = () => {

	}

	applyConfiguration = () => {

	}

	async componentDidMount() {

		this.getOptions()
	}

	onCategoryClick = ({ selectedCategory }) => {

		this.setState({ selectedCategory })
	}

	handleChange = (event, uniqueCategories) => {
		let searchedCategories = uniqueCategories.filter( category => category.includes(event.target.value.toUpperCase()))

		this.setState({ searchedCategories })
	}

	getCategories = allCategories => {
		return allCategories.map( (category, i) => {
			const treeCategoryClassName = category === this.state.selectedCategory
				? 'tree-category selected'
				: 'tree-category'
			return (
				<div
					className={ treeCategoryClassName }
					key={i}
					onClick={() => {
						this.onCategoryClick({ selectedCategory: category })
					}}
					><h1>{ category }</h1>
				</div>
			)})
	}

	getOptionsOfCategory = allCategories => {

		const {
			options,
			selectedCategory,
			selectedOptions
		} = this.state

		return options.filter( option => option.category == selectedCategory && allCategories.indexOf(selectedCategory) !== -1)
			.map( (option, i) => {
				const isSelected = selectedOptions.includes(option.id)
				return (
					<div
						className={isSelected ? 'tree-option selected' : 'tree-option'}
						key={i}
						onClick={ isSelected
							? () => this.removeOption( { id: option.id })
							: () => this.addOption({ id: option.id, description: option.description }) }
						>
							{option.description}
					</div>
				)
			})
	}

	render() {

		const {
			options,
			loadingOptions,
			selectedCategory,
			selectedOptions,
			searchedCategories
		} = this.state

		const {
			isOpen,
			onRequestClose,
			model,
			closeModal,
		} = this.props

		const categoriesWithDups = options.map( option => option.category)
		const uniqueCategories = [...new Set(categoriesWithDups)].sort()

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
		>
		<div className='header-wrapper'>
			<Heading size={4} className='has-text-centered'>
				Configure Your {model.name}
			</Heading>
			<Heading size={6} className='has-text-centered'>
				{model.type.name}
			</Heading>
			<input
				type='text'
				className='input-category-search'
				onChange={ event => this.handleChange(event, uniqueCategories)}
				placeholder='Look for a category'
			/>
			<Tags
				options={ options }
				selectedOptions={ selectedOptions }
				onRemove={ this.removeOption }
			/>
		</div>
		<div className='options-wrapper'>
			{loadingOptions
				? <Loader message='loading options'/>
				:
				<Columns className='tree-wrapper has-text-centered'>
					<Columns.Column className='tree-category-wrapper'>
						<Heading size={6}> Categories </Heading>
						{this.getCategories(searchedCategories === null ? uniqueCategories : searchedCategories)}
					</Columns.Column>
					<Columns.Column className='tree-options-wrapper'>
						<Heading size={6}> Options </Heading>
						{this.getOptionsOfCategory(searchedCategories === null ? uniqueCategories : searchedCategories)}
					</Columns.Column>
				</Columns>
			}
		</div>
		<div className='button-panel'>
			<Button onClick={ this.cancelConfiguration } className='configure-button'>Cancel</Button>
			<Button onClick={ this.restoreConfiguration } className='configure-button'>Restore</Button>
			<Button onClick={ this.applyConfiguration } className='configure-button'>Apply</Button>
		</div>
		</Modal>)
	}
}

export default OptionsContainer
