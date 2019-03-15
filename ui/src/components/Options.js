import React, { Component } from 'react'
import { Button, Heading, Columns } from 'react-bulma-components/full'
import Modal from 'react-modal'
import { Loader } from 'react-bulma-components/full'
import Tags from './Tags'

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
		const { allChoices, currentConfig, selectedOptions } = this.props

		if (!allCategories || allCategories.length === 0 ) {
			return (
				<Loader 
				style={{
					borderTopColor: 'transparent',
					boderRightColor: 'transparent',
					position: 'relative',
					width: '200px',
					height: '200px',
					top: 0
				}}
				message='Loading options for your configuration' />
			)
		}

		return allCategories.map( (category, i) => {

			const label = category.description.length ? category.description : category.id
			const isSelected = openedCategories.includes(category.id)
			const categoryChoices = allChoices.filter( choice => choice.id === category.id)
			
			let hasSelectedOptions = false
			categoryChoices.forEach( category => {

				const allChoicesInCat = category.invalid.concat(category.valid)

				if (allChoicesInCat.filter( choice => selectedOptions.indexOf(choice.id) != -1).length)
					hasSelectedOptions = true
			})

			return (
				<div className='category-wrapper' key={`category_wrapper${i}`}>
					<div
						className={ hasSelectedOptions ? 'tree-category selected' : 'tree-category' }
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

		const { currentConfig, allChoices, toggleOption, selectedOptions } = this.props

		return (

			allChoices.filter( choice => choice.id === categoryId).map( category => {

				const allChoicesInCat = category.valid.concat(category.invalid)

				return (allChoicesInCat.map(choice => {

					const isSelected = selectedOptions.indexOf(choice.id) !== -1

					return (
						<div className={`choice valid ${isSelected ? 'selected' : ''}`}
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
			currentConfig
		} = this.props

		const { build } = currentConfig

		return (
			<div className='config-status-bar'>
				Check Status: &nbsp;
				<span className={`config-status ${build.buildable ? 'valid' : 'invalid'}`}>{build.buildable ? 'Buildable' : 'Not buildable'}</span>&nbsp;/&nbsp;
				<span className={`config-status ${build.distinct ? 'valid' : 'invalid'}`}>{build.distinct ? 'Distinct ' : 'Not distinct'}</span>
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
			selectedOptions
		} = this.props

		const {
			searchedCategories
		} = this.state

		const model = currentConfig.model

		console.log('current congig', currentConfig)

		return (
			<Modal
				isOpen={isOpen}
				onRequestClose={closeModal}
			>
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
						<div class='loading-msg-wrapper'>{loading}</div>
						<Loader
						style={{
							borderTopColor: 'transparent',
							boderRightColor: 'transparent',
							//position:'relative'
						}} 
						message='Loading options for your configuration' />
					</div>
				</Modal>
			}
			<div className='modal-header-wrapper'>
				<Heading size={4} className='has-text-centered'>
					Configure Your {model.name}
				</Heading>
				<Heading size={6} className='has-text-centered'>
					{model.type.name}
				</Heading>
				{/* { currentConfig.images && currentConfig.images.length 
					? <SlideShow
						images={currentConfig.images.map( imageObj => imageObj.url)}
						indicators fixedImagesHeight infinite
					/> 
					: null
				} */}
				<input
					type='text'
					className='input-category-search'
					onChange={ event => this.handleSearchChange(event) }
					placeholder='Search for a category'
				/>
				{ this.renderStatusBar() }
				<p className='category-title' size={6}> Categories </p>
				<Tags
					flatChoices={ flatChoices }
					removeOption={ this.props.toggleOption }
					selectedOptions={ selectedOptions }
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
				<Button onClick={ restoreOptions } className='configure-button'>Restore</Button>
				<Button onClick={ this.props.onDone } className='configure-button'>Done</Button>
			</div>
			</Modal>
		)
	}

	getModalContent = () => {

		const {
			currentConfig,
			allChoices
		} = this.props

		return (
			currentConfig && allChoices
				? this.modalContent()
				: <Loader message='Loading options for your configuration' />
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
				{error && error.message}
				{this.getModalContent()}
			</Modal>
		)
	}
}

export default Options
