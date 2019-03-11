import React, { Component } from 'react'
import { Button, Heading, Box, Columns } from 'react-bulma-components/full'
import Modal from 'react-modal'
import { Loader } from 'react-bulma-components/full'

const Tags = ({ selectedOptions, flatChoices, onRemove }) => {
	return (
		<div className='tags-wrapper'>
			{selectedOptions.map( (option, i) => {
					return (
						<div className='tag description-tag' key={`tag_${i}`}>
							{flatChoices[option.id].choiceDescription}
							<span onClick={ () => onRemove({ id: option.id }) } className='tag-close'><i className="fas fa-times"></i></span>
						</div>
					)
				})
			}
		</div>
	)
}

class Options extends Component {

	constructor(props) {

		super(props)

		this.state = {
			searchedCategories: null,
			selectedCategory: null,



			filterMode: null,
		}
	}
	// getCategories = allCategories => {

	// 	return allCategories.map( (category, i) => {
	// 		const isSelected = this.state.selectedCategories.includes(category)
	// 		const treeCategoryClassName = isSelected
	// 			? 'tree-category selected'
	// 			: 'tree-category'
	// 		return (
	// 			<div className='tree-category-wrapper' key={`tree-wrapper_${i}`}>
	// 				<div
	// 					className={ treeCategoryClassName }
	// 					key={`tree-category_${i}`}
	// 					onClick={() => {
	// 						this.onCategoryClick({ category })
	// 					}}
	// 					><h1><i className={isSelected ? 'fas fa-chevron-down' : 'fas fa-chevron-right'}></i> { category }</h1>
	// 				</div>
	// 				{ isSelected &&
	// 					<div className='tree-option-wrapper'>
	// 						{this.getOptionsOfCategory( category )}
	// 					</div>
	// 				}
	// 			</div>
	// 		)})
	// }

	// getOptionsOfCategory = category => {

	// 	const {
	// 		options,
	// 		selectedOptions
	// 	} = this.state

	// 	return options.filter( option => option.category === category)
	// 		.map( (option, i) => {
	// 			const isSelected = selectedOptions.includes(option.id)
	// 			return (
	// 				<div
	// 					className={isSelected ? 'tree-option selected' : 'tree-option'}
	// 					key={`tree_option_${i}`}
	// 					onClick={ isSelected
	// 						? () => this.removeOption( { id: option.id })
	// 						: () => this.addOption({ id: option.id, description: option.description }) }
	// 					>
	// 						{option.description}
	// 				</div>
	// 			)
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


	handleSearchChange = (event, uniqueCategories) => {

		let searchedCategories = uniqueCategories.filter( category => category.includes(event.target.value.toUpperCase()))
		this.setState({ searchedCategories })
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

	getCategories = allCategories => {
		return allCategories.map( (category, i) => {
			const label = category.description.length ? category.description : category.id
			const isSelected = false
			const treeCategoryClassName = isSelected
				? 'tree-category selected'
				: 'tree-category'
			return (
				<div
					className={ treeCategoryClassName }
					key={`${i}`}
					onClick={() => this.onCategoryClick({ categoryDescription: label })}
					><h1>{ label }</h1>
				</div>
			)})
	}

	getChoicesOfCategory = categoryDescription => {

	}

	onRemove = id => {
		// selectedOptions. flatChoices[option.id].choiceDescription

	}

	modalContent = () => {

		const {
			isOpen,
			closeModal,
			currentConfig,
			flatChoices
		} = this.props

		const model = currentConfig.model
		console.log('current config', currentConfig)

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
				// onChange={ event => this.handleChange(event, uniqueCategoriesOnly) }
				placeholder='Look for a category'
			/>
			{/* <Button className={ filterMode === 'STANDARD_EQUIPMENT' ? 'filter-button selected' : 'filter-button' } onClick={ () => this.filterEquipment({classification: 'STANDARD_EQUIPMENT', uniqueCategories }) }> Standard Equipment </Button>
			<Button className={ filterMode === 'OPTIONAL_EQUIPMENT' ? 'filter-button selected' : 'filter-button' } onClick={ () => this.filterEquipment({classification: 'OPTIONAL_EQUIPMENT', uniqueCategories }) }> Optional Equipment </Button> */}
			<Tags
				flatChoices={ flatChoices }
				selectedOptions={ currentConfig.selectedOptions }
				onRemove={ this.removeOption }
			/>

		</div>
		{/* <div className='options-wrapper'>
			{
				<Columns className='tree-wrapper has-text-centered'>
					<Columns.Column className='tree-category-wrapper'>
						<Heading size={6}> Categories </Heading>
						{this.getCategories(currentConfig.choices)}
					</Columns.Column>
				</Columns>
			}
		}
		</div> */}
		<div className='button-panel'>
			<Button onClick={ this.cancelConfiguration } className='configure-button'>Cancel</Button>
			<Button onClick={ this.restoreConfiguration } className='configure-button'>Restore</Button>
			<Button onClick={ this.applyConfiguration } className='configure-button'>Apply</Button>
		</div>
		</Modal>)
	}

	getModalContent = () => {

		const {
			currentConfig,
		} = this.props

		return (
			currentConfig
			? this.modalContent()
			: <Loader message='Loading configuration and choices' />
		)
	}

	render() {

		const {
			isOpen,
			closeModal
		} = this.props

		return (
			<Modal
				isOpen={isOpen}
				onRequestClose={closeModal}>
				{this.getModalContent()}
			</Modal>
		)
	}
}

export default Options