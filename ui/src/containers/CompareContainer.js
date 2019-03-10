import React, { Component } from 'react'
import axios from 'axios'

import Modal from 'react-modal'
import { Loader, Button, Icon, Columns, Section, Container, Heading, Box } from 'react-bulma-components/full'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import "react-tabs/style/react-tabs.css"

import Dashboard from '../components/Dashboard'
import BarChart from '../components/BarChart'
import Option from '../components/Option'
import ModelCard from '../components/ModelCard'
import Redirect from 'react-router-dom/Redirect'
import getLocalStorage from '../modules/localStorage'
import OptionsContainer from './OptionsContainer'
import _ from 'lodash'

import '../style/compareContainer.css'
import compareData from './compareData.js'

class CompareContainer extends Component {

    constructor(props) {
		super(props)
        this.state = {
			defaultModels : null,
			compareMode : 'CO2',
			modalIsOpen: false,
			isTyping: true,
			modalContent: {},
		}
		this.phases = [
			{ key : 'LOW', color : '#4caf50', label : 'Low' },
			{ key : 'MEDIUM', color : '#ffeb3b', label : 'Medium' },
			{ key : 'HIGH', color : '#ff9800', label : 'High' },
			{ key : 'EXTRA_HIGH', color : '#f44336', label : 'Extra High' },
			{ key : 'COMBINED', color : '#1565c0', label : 'Combined' }
		]
	}

	async componentDidMount() {

		const urlData = this.props.location.pathname.split('/')
		const selectedModels = JSON.parse(decodeURIComponent(urlData[4]))
		const selectedModelsIds = Object.keys(selectedModels).map( key => ({ id: key, name: selectedModels[key].modelName }))

		const defaultModelsRes = await axios.get('/api/defaultModels', {
			params : {
				models: selectedModelsIds
			}
		})


		let defaultModelsArr = defaultModelsRes.data
		let defaultModels = {}
		//reassociate types and models
		defaultModelsArr.forEach( (model, i) =>
			defaultModels[model.model_id] =  {
				model,
				type : selectedModels[model.model_id].type
		})
		this.setState({ defaultModels })
	}

	setCompareMode = compareMode => this.setState({ compareMode })
	closeModal = () => this.setState({ modalIsOpen: false })
	openConfiguration = ({ modelId, modelName, typeName, typeId }) => {
		this.setState({ modalIsOpen: true,
			model: {
				name: modelName,
				id: modelId,
				type: {
					name: typeName,
					id: typeId
				},
			} })
	}

	render() {

		const {
			defaultModels,
			compareMode,
			modalIsOpen,
			modalContent,
			model
		} = this.state

		const urlData = this.props.location.pathname.split('/')

		if (!defaultModels)
			return (
					<div className="loaders">
						<Loader 
						style={{
							position:'fixed',
							width:300,
							height:300,
							border: '4px solid #023268',
							borderTopColor: 'transparent',
							boderRightColor: 'transparent',
							margin: 'auto',
							top: '-50px',
							left: 0,
							bottom: 0,
							right: 0
						}}
						message={'Getting configurations...'} />
					</div>
			)
		return (
			<div className='compare-container-wrapper'>
				<Section>
					<Container>
					<Heading size={4} className='has-text-centered'>
						Model Comparison
					</Heading>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
					<br />
					<Heading size={5} className='has-text-centered'>
						Bar Chart Title Goes Here
					</Heading>
					<div className='button-wrapper'>
						<div>
							<span><strong>Sort by: </strong></span>
							<label for="exampleRadioInline1" className="field">CO<sub>2</sub> Emissions
								<input
									onClick={() => this.setCompareMode('CO2')}
									className={'is-checkradio'}
									id="exampleRadioInline1"
									type="radio"
									name="exampleRadioInline"
									checked={compareMode === 'CO2'}
								/>
								<span class="checkmark"></span>
							</label>
							<label for="exampleRadioInline2" className="field">Fuel Consumption
								<input
									onClick={() => this.setCompareMode('CONSUMPTION')}
									className="is-checkradio"
									id="exampleRadioInline2"
									type="radio"
									name="exampleRadioInline"
									checked={compareMode ==='CONSUMPTION'} />
									<span class="checkmark"></span>
							</label>
						</div>
					</div>
					<BarChart
						defaultModels={ defaultModels }
						compareMode={ compareMode }
						phases={ this.phases }
					/>
					<hr class='divider'/>
					<Heading size={4} className='has-text-centered'>
						Model Ranking
					</Heading>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
					<br />
					<Dashboard
						defaultModels={ defaultModels }
						compareMode={ compareMode }
						openConfiguration= { this.openConfiguration }
						phases={ this.phases }
					/>
					{modalIsOpen &&
						<OptionsContainer
							isOpen={modalIsOpen}
							closeModal={ this.closeModal }
							model={model}
							countryCode={ urlData[2] }
							selectedOptions={ defaultModels[model.id].model.defaultOptions.map( option => option.id) }
						/>}
					</Container>
				</Section>
			</div>
		)
	}
}

export default CompareContainer
