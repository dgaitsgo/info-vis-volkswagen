import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Landing from '../components/Landing'
import Redirect from 'react-router-dom/Redirect'
import Model from '../components/Model'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Modal from 'react-modal'
import { NavLink } from 'react-router-dom'
import { Heading, Box, Section, Container, Button, Columns } from "react-bulma-components/full"
import '../style/model.css'
import '../style/modelsContainer.css'

class ModelsContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			models: null,
			selectedModels: {},
			modalIsOpen: false,
			modalContent: null,
			modelImages: null,
			loadingConfigurations : false,
			modelsLoading: true,
        }
	}

    componentDidMount() {

		const urlData = this.props.location.pathname.split('/')

        axios.get('/api/models', {
            params : {
                countryCode: urlData[2],
                brand_id : urlData[3]
            }
        })
        .then( res => {

			let models = res.data.models.data
			models.sort( (a, b) => a.name > b.name ? 1 : -1)

			this.setState({ models, modelsLoading: false })
		}).catch(err => {
			const to = {
				pathname : '/server-error',
				query : {
					err
				}
			}
		})
    }

	setConfigurations = () => {

		const { selectedModels } = this.state
		const _selectedModels = Object.keys(selectedModels).map(key => ({ id : key, name : selectedModels[key] }))

		this.setState({ loadingConfigurations : true }, () => {

			axios.get('/api/configureModels', {
				params : {
					models : _selectedModels
				}
			}).then( res => {
				this.setState({ loadingConfigurations : false, configurationIds : res.data, redirectTo : true })
			})

		})

	}

	onTypeClick = ({modelName, modelId, typeName, typeId}) => {
		let { selectedModels } = this.state

		if (modelId in selectedModels && selectedModels[modelId].type.id === typeId)
			delete selectedModels[modelId]
		else {
			selectedModels[modelId] = {
				modelName,
				type: {
					name: typeName,
					id: typeId
				}
			}
		}

		this.setState({ modalIsOpen: false, selectedModels })
	}

	onClickModel = ({ name, id }) => {
		axios.get('/api/modelTypes', {
			params: {
				countryCode: this.props.location.pathname.split('/')[2],
				model_id: id
			}
		}).then( res => {
			let allTypes = res.data.modelTypes.data
			allTypes.sort( (a, b) => a.name > b.name ? 1 : -1)
			this.setState({ modalIsOpen: true,
				modalContent:{
					model_id: id,
					model_name: name,
					allTypes
				}
			})
		})
	}

	closeModal = () => this.setState({ modalIsOpen: false })

    render() {

		const urlData = this.props.location.pathname.split('/')

		const {
			models,
			selectedModels,
			modelsLoading,
			loadingConfigurations,
			configurationIds,
			modalIsOpen,
			modalContent
		} = this.state

        if (modelsLoading)
			return (
				<div className="loaders">
					<Loader
					style={{
						position:'fixed',
						width:300,
						height:300,
						border: '4px solid #01579b',
						borderTopColor: 'transparent',
						boderRightColor: 'transparent',
						margin: 'auto',
						top: '-50px',
						left: 0,
						bottom: 0,
						right: 0
					}}
				message={'Getting models...'} /></div>)

		if (configurationIds) {
			const encodedURL = escape((JSON.stringify(selectedModels)))
			return <Redirect to={{
<<<<<<< HEAD:src/containers/ModelsContainer.js
				pathname : `${this.props.location.pathname}/${encodedURL}`,
				params : {
					configurationIds
				}
=======
				pathname : `${this.props.location.pathname}/${JSON.stringify(selectedModels)}`,
				params : {  selectedModels }
>>>>>>> master:ui/src/containers/ModelsContainer.js
			}} />
		}

		const compareButtonClassName = selectedModels
			? 'compare-button has-text-centered active'
			: 'compare-button has-text-centered'

        return (
			<div className='models-wrapper'>
			<Section>
			<Container>
				<Heading size={4} className='models-header has-text-centered'>
					Select Models
				</Heading>
				<div className='models-body'>
					<Columns>
						{loadingConfigurations && <Loader />}
						{models.map(({ id, name }, i) => {
							return (
								<Model key= { id }
									id={ id }
									name={ name }
									onClick= {this.onClickModel}
									selected={selectedModels[id]}
								/>
							)
						})}
					</Columns>
				</div>
				<br />
				<div className={compareButtonClassName}>
					<Button onClick={this.setConfigurations}>
						Done
					</Button>
				</div>
				</Container>
				</Section>
				<Modal
						isOpen={modalIsOpen}
						onRequestClose={this.closeModal}
					>
					{modalContent &&
						<div className='modal-compare-content-wrapper'>
						<Heading size={4} className='has-text-centered'>
							Pick A Model Type
						</Heading>
							{
								modalContent.allTypes.map( (type, i) => {
									const modelTypeClassName = selectedModels[modalContent.model_id] && selectedModels[modalContent.model_id].type.name === type.name
										? 'type-elem selected'
										: 'type-elem'

									return (
										<Box
											className={modelTypeClassName}onClick={
												() => this.onTypeClick({
													modelName: modalContent.model_name,
													modelId: modalContent.model_id,
													typeName: type.name,
													typeId: type.id})}
											key={i}> {type.name}
										</Box>
									)
								})
							}
						</div>
					}
					</Modal>
			</div>
        )
    }
}

export default ModelsContainer