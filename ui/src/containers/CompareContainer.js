import React, { Component } from 'react'
import axios from 'axios'

import Modal from 'react-modal'
import { Loader, Button, Icon, Columns, Section, Heading, Box } from 'react-bulma-components/full'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import "react-tabs/style/react-tabs.css"

import Description from '../components/Description'
import Dashboard from '../components/Dashboard'
import BarChart from '../components/BarChart'
import Option from '../components/Option'
import ModelCard from '../components/ModelCard'
import Redirect from 'react-router-dom/Redirect'
import getLocalStorage from '../modules/localStorage'
// import OptionsContainer from './OptionsContainer'
import _ from 'lodash'
import Typist from 'react-typist'

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
		// const selectedModels = JSON.parse(this.props.match.params.model_string)
		console.log('selected models', selectedModels)
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
			isTyping
		} = this.state

		if (!defaultModels)
			return (
				<div>
					{/* <Loader message={'Getting configurations...'} /> */}
					<Typist
						onTypingDone={ () => {
							this.setState({ isTyping: false })
						}}
						cursor= {{
							show: false
						}}
					>
						<Heading className='has-text-centered'> Loading WLTP data of selected models... </Heading>
					</Typist>
					{!isTyping &&
					<Box> <Heading size={6} className='has-text-centered'> What is WLTP data? </Heading> <img src='http://wltpfacts.eu/wp-content/uploads/2017/03/1_What_is_WLTP-3.svg' alt='no img'/></Box>}
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
					<Dashboard
						defaultModels={ defaultModels }
						compareMode={ compareMode }
						openModal= { this.openModal }
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
