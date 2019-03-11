import React, { Component } from 'react'
import { Button, Heading, Box } from 'react-bulma-components/full'
import Modal from 'react-modal'
import { Loader } from 'react-bulma-components/full'

class Options extends Component {

	constructor(props) {

		super(props)

		this.state = {
			searchedCategories: null,
			selectedCategory: null,
		}
	}

	onCategoryClick = ({ selectedCategory }) => {

		this.setState({ selectedCategory })
	}

	handleSearchChange = (event, uniqueCategories) => {
		
		let searchedCategories = uniqueCategories.filter( category => category.includes(event.target.value.toUpperCase()))
		this.setState({ searchedCategories })
	}

	getCategories = allCategories => {
		return allCategories.map( (category, i) => {
			const treeCategoryClassName = category === this.state.selectedCategory
				? 'tree-category selected'
				: 'tree-catehory'
			return (
				<Box
					className={ treeCategoryClassName }
					key={i}
					onClick={() => {
						this.onCategoryClick({ selectedCategory: category })
					}}
					><h1>{ category }</h1>
				</Box>
			)})
	}

	getChoicesOfCategory = (allCategories) => {

		const {
			selectedCategory,
		} = this.state

		const {
			choices,
			currentConfig
		} = this.props

		const {
			selectedOptions
		} = currentConfig

		return choices.filter( choice => choice.category === selectedCategory && allCategories.indexOf(selectedCategory) !== -1)
			.map( (choice, i) => {

				const selected = selectedOptions.indexOf(choice.id) !== -1 

				const treeOptionClassName = selected
					? 'tree-choice selected'
					: 'tree-choice'
				
				const choiceFn = selected
					? () => this.props.removeOption(choice.id)
					: () => this.props.addOption(choice.id)
				
				return (
					<Box
						className={treeOptionClassName}
						key={i}
						onClick={choiceFn}>
						{choice.description}
					</Box>
				)
			})
	}

	modalContent = () => {

		const {
			searchedCategories,
		} = this.state

		const {
			currentConfig
		} = this.props

		const { model, choices } = currentConfig
		const categoriesWithDups = choices.map( choice => choice.category)
		const uniqueCategories = [...new Set(categoriesWithDups)].sort()

		return (
			<div>
				<Heading size={4} className='has-text-centered'>
					Configure Your {model.name}
				</Heading>
				<Heading size={6} className='has-text-centered'>
					{model.type.name}
				</Heading>
				<div className='build-status-wrapper'>
					<p className='build-status buildable'>{currentConfig.build.buildable ? 'Buildable' : 'Not Buildable'}</p>
					<p className='build-status distinct'>{currentConfig.build.distinct ? 'Distinct' : 'Not Distinct'}</p>
				</div>
				<input
					type='text'
					className='input-category-search'
					onChange={ event => this.handleSearchChange(event, uniqueCategories)}
					placeholder='Look for a category'
				/>
				<div>
					<div className='tree-wrapper has-text-centered'>
						{/* <Heading> Categories </Heading> */}
						<div className='tree-category-wrapper'>
							{this.getCategories(searchedCategories === null ? uniqueCategories : searchedCategories)}
						</div>
						<div className='tree-choices-wrapper'>
							{this.getChoicesOfCategory(searchedCategories === null ? uniqueCategories : searchedCategories)}

						</div>
					</div>
				</div>
				<Button className='configure-button'>Cancel</Button>
				<Button className='configure-button'>Restore</Button>
				<Button className='configure-button'>Rebuild</Button>
			</div>
		)
	}

	getModalContent = () => {

		const {
			currentConfig,
			choices
		} = this.props

		return (
			currentConfig && choices
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