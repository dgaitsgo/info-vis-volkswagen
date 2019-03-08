import React, { Component } from 'react'
import axios from 'axios'
import Redirect from 'react-router-dom/Redirect'
import Options from '../components/Options'
import Error from '../components/Error'
import { Loader, Button, Heading, Box } from 'react-bulma-components/full'
import Modal from 'react-modal'

class OptionsContainer extends Component {

	constructor(props) {

		super(props)
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

			//indicading if the options are currently beeing loaded
			loadingOptions: true,

			//represents the selected Category for a type
			selectedCategory: null

		}
	}

	addOption = (optionId) => {

		const { configId } = this.props

		this.setState({ loadingConfig : true }, () => {

			axios.get('/api/addOption', {
				params : {
					configId,
					optionId
				}}).then(res => {

					this.setState({ loadingConfig : false, loadingCheckBuild : true }, () => {
						this.checkBuild()
					})
			})
		})
		.catch(err => <Error message={`Could not add option ${optionId}`} />)
	}

	removeOption = (optionId) => {

		const { configId } = this.props

		this.setState({ loadingConfig : true }, () => {

			axios.get('/api/removeOption', {
				params : {
					configId,
					optionId
				}}).then(res => {

					this.setState({ loadingConfig : false, loadingCheckBuild : true }, () => {
						this.checkBuild()
					})
				})
				.catch(err => <Error message={`Could not remove option ${optionId}`} />)
		})
	}

	rebuildConfig = () => {

		const { configId } = this.props

		this.setState({ loadingConfig : true }, () => {

			axios.get('/api/rebuildConfig', {
				params : {
					configId,
				}}).then(res => {

					this.setState({ loadingConfig : false }, this.getChoices)
				})
				.catch(err => <Error message={`Could not rebuild configuration ${configId}`} />)
		})
	}

	checkBuild = () => {

		const { configId } = this.props

		axios.get('/api/checkBuild', {
			params : {
				configId
			}}).then(res => {

				this.setState({ build : res.data })
			})
			.catch(err => <Error message={`Could not rebuild configuration ${configId}`} />)
	}

	getChoices = () => {

		const { configId } = this.props

		axios.get('/api/choices', {
			params : { configId }
		}).then(res => {

			this.setState({
				loadingChoices : false,
				options: res.data
			})

		})
		.catch(err => <Error message={`Could not get choices for ${configId}`}/>)
	}

	getOptions = () => {

		const {
			countryCode,
			model
		} = this.props

		axios.get('/api/options', {
			params : {
				countryCode,
				type_id: model.type.id
			}
		}).then(res => {
			this.setState({
				loadingOptions : false,
				options: res.data.options.data
			})
		})
		.catch(err => <Error message={`Could not get options for ${model.type.id}`}/>)
	}


	async componentDidMount() {
		this.getOptions()
	}

	onCategoryClick = ({ selectedCategory }) => {

		this.setState({ selectedCategory })
	}

	render() {

		const {
			options,
			loadingOptions,
			selectedCategory,
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
		<Heading size={4} className='has-text-centered'>
			Configure Your {model.name}
		</Heading>
		<Heading size={6} className='has-text-centered'>
			{model.type.name}
		</Heading>
		{
			loadingOptions
				? <Loader message='loading options'/>
				:
				<div>
				<div className='tree-wrapper'>
					<div className='tree-category-wrapper'>
						{uniqueCategories.map( (category, i) => {
							const treeCategoryClassName = category === selectedCategory
								? 'tree-category selected'
								: 'tree-catehory'
							return (
								<Box
									className={ treeCategoryClassName }
									key={i}
									onClick={() => {
										this.onCategoryClick({ selectedCategory: category })
									}}
									>{category}
								</Box>
							)})}
					</div>
					<div className='tree-options-wrapper'>
						{ options.filter( option => option.category == selectedCategory)
							.map( (option, i) => {
								return (
									<Box key={i}>
										{option.description}
									</Box>
								)
							} )	}
					</div>
				</div>
			</div>
			}
			<Button className='configure-button'>Cancel</Button>
			<Button className='configure-button'>Restore</Button>
			<Button className='configure-button'>Rebuild</Button>
		</Modal>)
	}

}

export default OptionsContainer
