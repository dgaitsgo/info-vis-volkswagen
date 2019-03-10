import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'
import axios from 'axios'
import Landing from '../components/Landing'
import Redirect from 'react-router-dom/Redirect'
import Model from '../components/Model'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Modal from 'react-modal'
import { NavLink } from 'react-router-dom'
import { Heading, Box, Section, Container, Button, Columns } from "react-bulma-components/full"
import '../style/model.css'
import isEmtpty from 'lodash/isEmpty'

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
			redirectToCompare: false
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

	toModelsCompare = () => {

		const escapedURL = escape((JSON.stringify(selectedModels)))
		const urlData = this.props.location.pathname.split('/')
		const {
			selectedModels
		} = this.state
		if (!isEmtpty(selectedModels))
			this.setState({ redirectToCompare: true })
	}

    render() {

		const urlData = this.props.location.pathname.split('/')

		const {
			models,
			selectedModels,
			modelsLoading,
			loadingConfigurations,
			modalIsOpen,
			modalContent,
			redirectToCompare
		} = this.state

		if (redirectToCompare){
			const encodedURL = encodeURIComponent((JSON.stringify(selectedModels)))

			return <Redirect to={{
				pathname : `${this.props.location.pathname}/${encodedURL}`,
				params : {  encodedURL }
			}} />
		}

        if (modelsLoading)
			return (
				<div className="loaders">
					<ContentLoader
						height={190}
						width={500}
						speed={1}
						primaryColor="#f3f3f3"
						secondaryColor="#ecebeb"
					>
						<rect x="80" y="30" rx="0" ry="0" width="90" height="30" />
						<rect x="180" y="30" rx="0" ry="0" width="90" height="30" />
						<rect x="280" y="30" rx="0" ry="0" width="90" height="30" />
						<rect x="80" y="105" rx="0" ry="0" width="90" height="30" />
						<rect x="180" y="105" rx="0" ry="0" width="90" height="30" />
						<rect x="280" y="105" rx="0" ry="0" width="90" height="30" />
					</ContentLoader>
				</div>
			)

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
					{loadingConfigurations && <ContentLoader />}
					<Columns className='is-centered'>
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
					<Button className="is-medium" disabled={isEmtpty(selectedModels)} onClick={ this.toModelsCompare }>
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
									const modelTypeClassName = selectedModels[modalContent.model_id] && selectedModels[modalContent.model_id].type.id === type.id
										? 'type-elem has-text-centered selected'
										: 'type-elem has-text-centered'

									return (
										<div
											className={modelTypeClassName}onClick={
												() => this.onTypeClick({
													modelName: modalContent.model_name,
													modelId: modalContent.model_id,
													typeName: type.name,
													typeId: type.id})}
											key={i}> {type.name}
										</div>
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