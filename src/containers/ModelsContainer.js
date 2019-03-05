import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'
import axios from 'axios'
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
			loadingConfigurations : false,
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

		const urlData = this.props.location.pathname.split('/')

		const {
			models,
			selectedModels,
			fullModels,
			modelsLoading,
			loadingConfigurations,
			configurationIds
        } = this.state

        if (modelsLoading)
			return (
				<ContentLoader 
					height={190}
					width={450}
					speed={2}
					primaryColor="#f3f3f3"
					secondaryColor="#ecebeb"
					>
					<rect x="80" y="30" rx="0" ry="0" width="90" height="70" /> 
					<rect x="180" y="30" rx="0" ry="0" width="90" height="70" /> 
					<rect x="280" y="30" rx="0" ry="0" width="90" height="70" /> 
					<rect x="80" y="105" rx="0" ry="0" width="90" height="70" /> 
					<rect x="180" y="105" rx="0" ry="0" width="90" height="70" /> 
					<rect x="280" y="105" rx="0" ry="0" width="90" height="70" /> 
				</ContentLoader>
			)

		if (configurationIds) {
			return <Redirect to={{
				pathname : `${this.props.location.pathname}/${JSON.stringify(selectedModels)}`,
				params : {
					configurationIds
				}
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
					Compare Models and Types:
				</Heading>
				<div className='models-body'>
					<Columns>
						{loadingConfigurations && <ContentLoader />}
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