import React, { Component } from 'react'
import { Button, Heading, Columns } from 'react-bulma-components/full'
import Modal from 'react-modal'
import { Loader } from 'react-bulma-components/full'
import { debounce } from 'lodash'

import '../style/options.css'

const Tags = ({ selectedOptions, flatChoices, removeOption }) => {

	return (
		<div className='tags-wrapper'>
			{selectedOptions.map( (option, i) => {
					if (!flatChoices[option.id])
						console.log('missing option is', flatChoices[option.id])
					return (
						<div className='tag description-tag' key={`tag_${i}`}>
							{flatChoices[option.id] && flatChoices[option.id].choiceDescription}
							<span onClick={ debounce(() => removeOption({ id: option.id }), 1000) } className='tag-close'><i className="fas fa-times"></i></span>
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
			//All categories filterd by the search bar
			searchedCategories: null,

			//All categories that should display its choices
			selectedCategories: [],
		}
	}

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
				<div className='category-wrapper' key={`category_wrapper${i}`}>
					<div
						className={ treeCategoryClassName }
						key={`category_${i}`}
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
		const selectedOptionsArr = currentConfig.selectedOptions.map( option => option.id)
		const allChoices = currentConfig.choices

		return (
			allChoices.filter( choice => choice.id === categoryId).map( choice => {

				return (choice.valid.map( valid => {
					const isSelected = selectedOptionsArr.includes(valid.id)
					return (
						<div
							className={`choice valid ${isSelected ? 'selected' : ''}`}
							key={ valid.id }
							onClick={ debounce(() => this.props.addOption( valid.id ), 1000) }
						>
							&bull; {valid.description}
						</div>
					)
				}).concat(choice.invalid.map( invalid => {
					return (
						<div
							key={ invalid.id }
							className='choice invalid'
						>
							&bull; {invalid.description}
						</div>
					)
					}))
				)
			})
		)
	}

	modalContent = () => {

		const {
			isOpen,
			closeModal,
			currentConfig,
			removeOption
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
			<div className='modal-header-wrapper'>
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
					placeholder='Search for a category'
				/>
				<Tags
					flatChoices={ this.props.flatChoices }
					selectedOptions={ currentConfig.selectedOptions }
					removeOption={ removeOption }
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
			</Modal>
		)
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
