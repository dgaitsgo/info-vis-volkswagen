import React, { Component } from 'react'
import { Button, Heading, Columns } from 'react-bulma-components/full'
import Modal from 'react-modal'
import { Loader } from 'react-bulma-components/full'

import '../style/options.css'

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
			selectedCategories: [],
			selectedOptions: this.props.selectedOptions,
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

	handleSearchChange = (event) => {

		const { currentConfig } = this.props

		const allChoices = currentConfig.choices

		let searchedCategories = allChoices.filter( category => {
			const label = category.description.length ? category.description : category.id
			return label.toUpperCase().includes(event.target.value.toUpperCase())
		})
		this.setState({ searchedCategories })
	}

	onCategoryClick = ({ categoryId }) => {

		let { selectedCategories } = this.state

		if (!selectedCategories.includes(categoryId))
		{
			selectedCategories.push(categoryId)
			this.setState({ selectedCategories })
		} else {
			this.setState({ selectedCategories: selectedCategories.filter( elem => elem !== categoryId )})
		}

	}

	getCategories = allCategories => {
		const { selectedCategories } = this.state

		return allCategories.map( (category, i) => {
			const label = category.description.length ? category.description : category.id
			const isSelected = selectedCategories.includes(category.id)
			const treeCategoryClassName = isSelected
				? 'tree-category selected'
				: 'tree-category'
			return (
				<div>
					<div
						className={ treeCategoryClassName }
						key={`${i}`}
						onClick={() => this.onCategoryClick({ categoryId: category.id })}
						><h1><i className={isSelected ? 'fas fa-chevron-down' : 'fas fa-chevron-right'}></i> { label }</h1>
					</div>
					<div className='choice-wrapper'>
						{ isSelected && this.getChoicesOfCategory(category.id)}
					</div>
				</div>
			)})
	}

	getChoicesOfCategory = categoryId => {

		const { currentConfig } = this.props

		const allChoices = currentConfig.choices

		return (
			allChoices.filter( choice => choice.id === categoryId).map( choice => {

			return (choice.valid.map( valid => {
				return (
					<div className='choice valid'>
						{valid.description}
					</div>
				)
			}).concat(choice.invalid.map( invalid => {
				return (
					<div className='choice invalid'>
						{invalid.description}
					</div>
				)
			})))
		})
	)

	}

	removeTag = id => {

	}

	modalContent = () => {

		const {
			isOpen,
			closeModal,
			currentConfig,
			flatChoices
		} = this.props

		const {
			searchedCategories
		} = this.state

		const model = currentConfig.model

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
				onChange={ event => this.handleSearchChange(event) }
				placeholder='Look for a category'
			/>
			<Tags
				flatChoices={ flatChoices }
				selectedOptions={ currentConfig.selectedOptions }
				onRemove={ this.removeTag }
			/>

		</div>
		<div className='options-wrapper'>
		{
			<Columns className='tree-wrapper has-text-centered'>
				<Columns.Column className='tree-category-wrapper'>
					<Heading size={6}> Categories </Heading>
					{this.getCategories(searchedCategories ? searchedCategories : currentConfig.choices)}
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