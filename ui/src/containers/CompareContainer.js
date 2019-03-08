import React, { Component } from 'react'
import axios from 'axios'

import Modal from 'react-modal'
import { Loader, Button, Icon, Columns, Section, Heading, Box } from 'react-bulma-components/full'
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
				<div>
					<Loader message={'Getting configurations...'} />
				</div>
			)
		return (
			<div className='compare-container-wrapper'>
				<div className='dashboard'>
					<Heading size={4} className='has-text-centered'>
						Model Comparison
					</Heading>
					<div className='button-wrapper'>
						<div className="field">
							<span>Sort by: </span>
							<input
								onClick={() => this.setCompareMode('CO2')}
								className={'is-checkradio'}
								id="exampleRadioInline1"
								type="radio"
								name="exampleRadioInline"
								checked={compareMode === 'CO2'}
							/>
							<label for="exampleRadioInline1">CO<sub>2</sub></label>
							<input
								onClick={() => this.setCompareMode('CONSUMPTION')}
								className="is-checkradio"
								id="exampleRadioInline2"
								type="radio"
								name="exampleRadioInline"
								checked={compareMode ==='CONSUMPTION'} />
							<label for="exampleRadioInline2">Consumption</label>
						</div>
					</div>
					<BarChart
						defaultModels={ defaultModels }
						compareMode={ compareMode }
					/>
					<hr class='divider'/>
					<Dashboard
						defaultModels={ defaultModels }
						compareMode={ compareMode }
						openConfiguration= { this.openConfiguration }
					/>
					{modalIsOpen &&
						<OptionsContainer
							isOpen={modalIsOpen}
							closeModal={ this.closeModal }
							model={model}
							countryCode={ urlData[2] }
							selectedOptions={ defaultModels[model.id].model.defaultOptions.map( option => option.id) }
						/>}
				</div>
			</div>
		)
	}
}

export default CompareContainer
