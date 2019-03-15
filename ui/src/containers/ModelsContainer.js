import React, { Component } from 'react'
import axios from 'axios'
import Redirect from 'react-router-dom/Redirect'
import Model from '../components/Model'
import Modal from 'react-modal'
import { Heading, Loader, Section, Container, Button, Columns } from 'react-bulma-components/full'
import '../style/model.css'
import isEmpty from 'lodash/isEmpty'

class ModelsContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			selectedModels: {},
			modalIsOpen: false,
			modalContent: null,
			modelImages: null,
			modelsLoading: true,
			redirectToCompare: false
        }
	}

    componentDidMount() {

		window.scrollTo(0, 0)

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
			this.setState({ error : err, message : 'Could not find thos models.' })
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
		const {selectedModels} = this.state

		if (!isEmpty(selectedModels))
			this.setState({ redirectToCompare: true })
	}

    render() {

		const {
			models,
			selectedModels,
			modelsLoading,
			modalIsOpen,
			modalContent,
			redirectToCompare,
			error
		} = this.state

		if (redirectToCompare) {
			const encodedURL = encodeURIComponent((JSON.stringify(selectedModels)))

			// const pathname =

			return <Redirect to={{
				pathname : `${this.props.location.pathname}/${encodedURL}`,
				params : {  encodedURL }
			}} />
		}

		if ( error )
			return (
				<Redirect to={ { pathname : '/server-error', params : error.message } } />
		)

        if (modelsLoading)
			return (
				<div className='loaders'>
					<Loader
						style={{
							borderTopColor: 'transparent',
							boderRightColor: 'transparent',
						}}
					/>
					<Heading className='loader-msg' size={4}>Getting Models...</Heading>
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
					<Button className='is-medium' disabled={isEmpty(selectedModels)} onClick={ this.toModelsCompare }>
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
													typeId: type.id})
												}
												key={i}>
											{type.name}
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