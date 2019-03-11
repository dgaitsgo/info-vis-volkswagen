import React, { Component } from 'react'
import axios from 'axios'
import Error from '../components/Error'
import { Loader, Button, Heading, Columns } from 'react-bulma-components/full'
import Modal from 'react-modal'
import _ from 'lodash'
import '../style/optionsContainer.css'

const Tags = ({ options, selectedOptions, onRemove }) => {
	return (
		<div className='tags-wrapper'>
			{ options.filter( option => selectedOptions.includes(option.id))
			.map( (option, i) => {
					return (
						<div className='tag description-tag' key={`tag_${i}`}>
							{option.description}
							<span onClick={ () => onRemove({ id: option.id }) } className='tag-close'><i className="fas fa-times"></i></span>
						</div>
					)
				})
			}
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
			selectedCategories: [],

			filterMode: null,
		}
	}

	addOption = ({ id }) => {

		let selectedOptions = this.state.selectedOptions

		selectedOptions.push( id )

		this.setState({ selectedOptions })
	}

	removeOption = ({ id }) => {

		const {
			selectedOptions
		} = this.state

		this.setState({ selectedOptions: selectedOptions.filter( optionId => optionId !== id) })
	}

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

	onCategoryClick = ({ category }) => {

		let { selectedCategories } = this.state


		if (!selectedCategories.includes(category))
		{
			selectedCategories.push(category)
			this.setState({ selectedCategories })
		}
		else {
			this.setState({ selectedCategories: selectedCategories.filter( elem => elem !== category )})
		}

	}

	handleChange = (event, uniqueCategories) => {
		let searchedCategories = uniqueCategories.filter( category => category.includes(event.target.value.toUpperCase()))

		this.setState({ searchedCategories })
	}

	getCategories = allCategories => {

		return allCategories.map( (category, i) => {
			const isSelected = this.state.selectedCategories.includes(category)
			const treeCategoryClassName = isSelected
				? 'tree-category selected'
				: 'tree-category'
			return (
				<div className='tree-category-wrapper' key={`tree-wrapper_${i}`}>
					<div
						className={ treeCategoryClassName }
						key={`tree-category_${i}`}
						onClick={() => {
							this.onCategoryClick({ category })
						}}
						><h1><i className={isSelected ? 'fas fa-chevron-down' : 'fas fa-chevron-right'}></i> { category }</h1>
					</div>
					{ isSelected &&
						<div className='tree-option-wrapper'>
							{this.getOptionsOfCategory( category )}
						</div>
					}
				</div>
			)})
	}

	getOptionsOfCategory = category => {

		const {
			options,
			selectedOptions
		} = this.state

		return options.filter( option => option.category === category)
			.map( (option, i) => {
				const isSelected = selectedOptions.includes(option.id)
				return (
					<div
						className={isSelected ? 'tree-option selected' : 'tree-option'}
						key={`tree_option_${i}`}
						onClick={ isSelected
							? () => this.removeOption( { id: option.id })
							: () => this.addOption({ id: option.id, description: option.description }) }
						>
							{option.description}
					</div>
				)
			})
	}

	filterEquipment = ({ uniqueCategories, classification }) => {

		let {
			searchedCategories
		} =  this.state

		if (classification === this.state.filterMode)
			this.setState({ searchedCategories: null, filterMode: null })
		else {
			searchedCategories = uniqueCategories.filter( category => category.classification === classification).map( category => category.category ).sort()

			this.setState({ searchedCategories, filterMode: classification })
		}


	}

	render() {

		const {
			options,
			loadingOptions,
			selectedOptions,
			searchedCategories,
			filterMode
		} = this.state

		const {
			isOpen,
			model,
			closeModal,
		} = this.props

		const categoriesWithDups = options.map( option => {
			return {
				category: option.category,
				classification: option.classification
			}
		})
		const uniqueCategories = _.uniqBy(categoriesWithDups, 'category');
		const uniqueCategoriesOnly = uniqueCategories.map( category => category.category).sort()

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
			<img src='https://images.hgmsites.net/med/2019-audi-a4_100656485_m.jpg' alt='test'/>
			<input
				type='text'
				className='input-category-search'
				onChange={ event => this.handleChange(event, uniqueCategoriesOnly) }
				placeholder='Look for a category'
			/>
			<Button className={ filterMode === 'STANDARD_EQUIPMENT' ? 'filter-button selected' : 'filter-button' } onClick={ () => this.filterEquipment({classification: 'STANDARD_EQUIPMENT', uniqueCategories }) }> Standard Equipment </Button>
			<Button className={ filterMode === 'OPTIONAL_EQUIPMENT' ? 'filter-button selected' : 'filter-button' } onClick={ () => this.filterEquipment({classification: 'OPTIONAL_EQUIPMENT', uniqueCategories }) }> Optional Equipment </Button>
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
						{this.getCategories(searchedCategories === null ? uniqueCategoriesOnly : searchedCategories)}
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
