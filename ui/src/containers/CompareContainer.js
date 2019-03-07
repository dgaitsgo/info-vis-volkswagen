import React, { Component } from 'react'
import axios from 'axios'

import Modal from 'react-modal'
import { Loader, Button, Icon, Columns, Section, Heading, Box } from 'react-bulma-components/full'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import "react-tabs/style/react-tabs.css"

import Description from '../components/Description'
import Sidebar from '../components/Sidebar'
import BarChart from '../components/BarChart'
import Option from '../components/Option'
import ModelCard from '../components/ModelCard'
import Redirect from 'react-router-dom/Redirect'
import getLocalStorage from '../modules/localStorage'
// import OptionsContainer from './OptionsContainer'
import _ from 'lodash'

import '../style/compareContainer.css'
import compareData from './compareData.js';

class CompareContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			defaultModels : null,
			compareMode : 'CO2',
			modalIsOpen: false,
			modalContent: {},
		}
	}

	async componentDidMount() {

		const urlData = this.props.location.pathname.split('/')

		const selectedModels = JSON.parse(unescape(urlData[4]))
		console.log('selected Models', selectedModels)
		const selectedModelsIds = Object.keys(selectedModels).map( key => ({ id: key, name: selectedModels[key].modelName }))
		console.log('selected ModelsIds', selectedModelsIds)

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

	openModal = ({ model_id, model_name, typeName, typeId }) => {
		this.setState({ modalIsOpen: true,
			modalContent: {
				model_name,
				type: {
					name: typeName,
					id: typeId
				},
				selectedCategory: null
			} })
	}

	onCategoryClick = ({ category }) => {

		const {
			modalContent
		} = this.state

		modalContent.selectedCategory = category

		this.setState({ modalContent })
	}

	render() {

		const {
			defaultModels,
			compareMode,
			modalIsOpen,
			modalContent,
		} = this.state

		if (!defaultModels)
			return <Loader message={'Getting configurations...'} />
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
					<Sidebar
						defaultModels={ defaultModels }
						compareMode={ compareMode }
						openModal= { this.openModal }
					/>
					<BarChart
						defaultModels={ defaultModels }
						compareMode={ compareMode }
					/>
					{/* {modalIsOpen &&
						<OptionsContainer

							isOpen={modalIsOpen}
							onRequestClose={this.closeModal}
						/>
					} */}
			</div>
		</div>)
	}
}

export default CompareContainer
