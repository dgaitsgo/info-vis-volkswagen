import React, { Component } from 'react'
import { Button, Heading, Columns } from 'react-bulma-components/full'
import Modal from 'react-modal'
import { Loader } from 'react-bulma-components/full'
import classnames from 'classnames'
import Tags from './Tags'
import ReactTooltip from 'react-tooltip'

import '../style/options.css'


class Options extends Component {

	constructor(props) {

		super(props)

		this.state = {

			//All categories filterd by the search bar
			searchedCategories: null,

			//All categories that should display its choices
			openedCategories: [],
		}
	}

	handleSearchChange = (event) => {
		const { allChoices } = this.props

		let searchedCategories = allChoices.filter( category => {
			const label = category.description.length ? category.description : category.id
			return label.toUpperCase().includes(event.target.value.toUpperCase())
		})
		this.setState({ searchedCategories })
	}

	onCategoryClick = ({ categoryId }) => {

		let { openedCategories } = this.state

		if (!openedCategories.includes(categoryId)) {
			openedCategories.push(categoryId)
			this.setState({ openedCategories })
		} else {
			this.setState({ openedCategories: openedCategories.filter( elem => elem !== categoryId )})
		}

	}

	getCategories = allCategories => {

		const { openedCategories } = this.state
		const {
			allChoices,
			currentConfig,
			selectedOptions,
			invalidOptions
		} = this.props

		if (!allCategories || allCategories.length === 0 ) {
			return (
				<div className='loaders'>
					<Loader
						style={{
							borderTopColor: 'transparent',
							boderRightColor: 'transparent',
						}}
					/>
					<Heading className='loader-msg' size={4}>Getting Options...</Heading>
				</div>
			)
		}

		return allCategories.map( (category, i) => {

			const label = category.description.length ? category.description : category.id
			const isSelected = openedCategories.includes(category.id)
			const categoryChoices = allChoices.filter( choice => choice.id === category.id)

			let hasSelectedOptions = false
			let hasInvalidOptions = false
			categoryChoices.forEach( category => {

				const allChoicesInCat = category.invalid.concat(category.valid)

				if (allChoicesInCat.filter( choice => selectedOptions.indexOf(choice.id) != -1).length)
					hasSelectedOptions = true

				if (allChoicesInCat.filter(choice => invalidOptions.indexOf(choice.id) != -1 ).length) {
					hasInvalidOptions = true
				}
			})

			const categoryClassName = classnames({
				'tree-category' : true,
				'selected' : hasSelectedOptions,
				'invalid'  : hasInvalidOptions,
			})

			return (
				<div className='category-wrapper' key={`category_wrapper${i}`}>
					<div
						className={ categoryClassName }
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

		const {
			currentConfig,
			allChoices,
			toggleOption,
			selectedOptions,
			invalidOptions
		} = this.props

		return (

			allChoices.filter( choice => choice.id === categoryId).map( category => {

				const allChoicesInCat = category.valid.concat(category.invalid)

				return (allChoicesInCat.map(choice => {

					const isSelected = selectedOptions.indexOf(choice.id) !== -1
					const isInvalid = invalidOptions.indexOf(choice.id) !== -1

					const choiceClassName = classnames({
						'choice' : true,
						'valid' : true,
						'selected' : isSelected,
						'invalid' : isInvalid,
						'unselected' : !isSelected
					})

					return (
						<div className={choiceClassName}
							key={ choice.id }
							onClick={ () => toggleOption(choice.id) }>
							&bull; {choice.description ? choice.description : <i>(No Description)</i>}
						</div>
					)
				}))
			})
		)
	}

	renderStatusBar = () => {

		const {
			currentConfig,
			mode
		} = this.props

		const { build } = currentConfig

		return (
			<div className='config-status-bar'>
				Check Status: &nbsp;
				<ReactTooltip place='top' type='dark' clickable={true}/>
				<span data-tip='The buildable status indicates wether a configuration can be manufactured.' className={`config-status ${build.buildable ? 'valid' : 'invalid'}`}>{build.buildable ? 'Buildable' : 'Not buildable'}</span>&nbsp;&nbsp;
				<span data-tip='The distinct status indicates if there are several options, on how a car could be build.' className={`config-status ${build.distinct ? 'valid' : 'invalid'}`}>{build.distinct ? 'Distinct ' : 'Not distinct'}</span>
			</div>
		)
	}

	modalContent = () => {

		const {
			isOpen,
			closeModal,
			currentConfig,
			removeOption,
			allChoices,
			flatChoices,
			loading,
			restoreOptions,
			selectedOptions,
			invalidOptions,
			error
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
			{ error &&
				<div className='error-message'>
					Sorry, we can't show you options for this configuration at the moment.
				</div>
			}
			{loading &&
				<Modal className='loading-modal'
					overlayClassName='loading-modal-overlay'
					style={{
						display: 'none',
						height: '100%',
						left: 0,
						position: 'fixed',
						top: 0,
						width: '100%'
					}}
					isOpen={true}>
					<div className='loader-message-wrapper'>
						<div className='loading-msg-wrapper'>{loading}</div>
						<Loader
						style={{
							borderTopColor: 'transparent',
							boderRightColor: 'transparent',
						}}
						message='Loading options for your configuration' />
					</div>
				</Modal>
			}
			<div className='modal-header-wrapper'>
				<Heading size={4} className='has-text-centered'>
					Configure Your {model.name}
				</Heading>
				{ invalidOptions.length > 0 &&
					<div className='invalid-options-warning'>
						<p><strong>Configuration could not be built as is.</strong> Some of your selected options are in conflict. Please refine your choices to get a buildable and distinct vehicle.
							Please note that some options may conflict with other, often since only one in a category (like Type) can be selected at a time.
						</p>
					</div>
				}
				{ this.renderStatusBar() }
				<Tags
					flatChoices={ flatChoices }
					removeOption={ this.props.toggleOption }
					selectedOptions={ selectedOptions }
				/>
			</div>
			<div className='header choices-selection' style={{ display : 'flex', justifyContent : 'center', alignItems : 'center' }}>
			<p className='category-title'>Categories / Options</p>
			<input
					type='text'
					className='input-category-search'
					onChange={ event => this.handleSearchChange(event) }
					placeholder='Search for a category'
				/>
			</div>
			<div className='options-wrapper'>
			{
				<Columns className='tree-wrapper'>
					<Columns.Column className='tree-category-wrapper'>
						{this.getCategories(searchedCategories ? searchedCategories : allChoices )}
					</Columns.Column>
				</Columns>
			}
			</div>
			<div className='button-panel'>
				<Button onClick={ () => this.props.onDone(selectedOptions) } className='configure-button'>Done</Button>
			</div>
			</Modal>
		)
	}

	getModalContent = () => {

		const {
			currentConfig,
			allChoices,
			error
		} = this.props

		return (
			error
				? <p>{error.message}</p>
				: currentConfig && allChoices
				? this.modalContent()
				: <div className='loaders'>
					<Loader
						style={{
							borderTopColor: 'transparent',
							boderRightColor: 'transparent',
						}}
					/>
					<Heading className='loader-option-msg' size={4}>Getting Options...</Heading>
				</div>
		)
	}

	render() {

		const {
			isOpen,
			closeModal,
			error
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
