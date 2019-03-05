import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Landing from '../components/Landing'
import Redirect from 'react-router-dom/Redirect'
import Model from '../components/Model'
import { NavLink } from 'react-router-dom'
import { Heading } from "react-bulma-components/full"
import { Section } from "react-bulma-components/full"
import { Container } from "react-bulma-components/full"
import { Button } from "react-bulma-components/full"
import { Columns } from "react-bulma-components/full"
import '../style/model.css'

class ModelsContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			models: null,
			selectedModels: {},
			modelImages: null,
			modelsLoading: true
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

			const models = res.data.models.data

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

	onClickModel = ({ name, id }) => {
		let { selectedModels } = this.state

		id in selectedModels
			? delete selectedModels[id]
			: selectedModels[id] = name

		this.setState({ selectedModels })
	}

    render() {

		const {
			models,
			selectedModels,
			modelsLoading,
			redirect
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
			return <Redirect to={{
				pathname : `${this.props.location.pathname}/${JSON.stringify(selectedModels)}`,
				params : {  selectedModels }
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
					Select Models:
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
			</div>
        )
    }
}

export default ModelsContainer