import React, { Component } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import { Button } from 'react-bulma-components/full'
import { Loader } from 'react-bulma-components/full'
import { Bar } from 'react-chartjs-2'


class CompareContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			defaultModels : null,
			compareMode : 'CO2'
		}
	}

	checkBuild = () => { }
		
	saveToLocal = () => { }

	async componentDidMount() {

		const urlData = this.props.location.pathname.split('/')
		const _models = JSON.parse(urlData[3])
		let models = Object.keys(_models).map(modelId => ({ id : modelId, name : _models[modelId] }))

		console.log('requesting models', models)

		const defaultModelsRes = await axios.get('/api/defaultModels', {
			params : {
				models,
			}
		})

		let defaultModelsArr = defaultModelsRes.data
		let defaultModels = {}

		defaultModelsArr.forEach(model => {
			defaultModels[model.model_id] = model
		})

		console.log(defaultModels)

		this.setState({ defaultModels })
	}

	setCompareMode = compareMode => this.setState({compareMode})

	getInterpolations = ({ defaultModels, phase, compareMode}) => {

		return Object.keys(defaultModels).map( (modelId, i) => {

			const model = defaultModels[modelId]

			if (model.wltp.length) {

				const currentInterps = model.wltp[0].interpolations
					.filter(interp => interp.value_type === compareMode && interp.phase == phase)
					.map( interp => interp.value)

					return ({
						value: currentInterps,
						name: model.name
					})
			}
			else{
				return ({
					value: null,
					name: model.name
				})
			}

		})
	}

	transformToDataSet = ({ low, med, high, extra }) => {
		return (
			{
				labels: low.filter(({ value }) => value && value.length).map(({ name }) => name),
				datasets: [{
					data: low.map( ({ value }) => value),
					label:"Low",
					backgroundColor:"#4caf50",
					borderColor:"#43a047",
					borderWidth:1,
					hoverBackgroundColor:"#81c784",
					hoverBorderColor:"#66bb6a"
				},
				{
					data: med.map(({ value }) => value),
					label: 'Medium',
					backgroundColor:"#ffeb3b",
					borderColor:"#fdd835",
					borderWidth:1,
					hoverBackgroundColor:"#fff176",
					hoverBorderColor:"#ffee58"
				},
				{
					data: high.map(({ value }) => value),
					label: 'High',
					backgroundColor:"#ff9800",
					borderColor:"#fb8c00",
					borderWidth:1,
					hoverBackgroundColor:"#ffb74d",
					hoverBorderColor:"#ffa726"
				},
				{
					data: extra.map(({ value }) => value),
					label: 'Extra',
					backgroundColor:"#f44336",
					borderColor:"#e53935",
					borderWidth:1,
					hoverBackgroundColor:"#e57373",
					hoverBorderColor:"#ef5350"
				},
			]
			}
		)
	}

	render() {

		const {
			defaultModels,
			compareMode
		} = this.state

		if (!defaultModels)
			return <Loader message={'Getting configurations...'} />

		const lowEmissions = this.getInterpolations({ defaultModels, compareMode, phase:'LOW' })
		const medEmissions = this.getInterpolations({ defaultModels, compareMode, phase:'MEDIUM' })
		const highEmissions = this.getInterpolations({ defaultModels, compareMode, phase:'HIGH' })
		const extraHighEmissions = this.getInterpolations({ defaultModels, compareMode, phase:'EXTRA_HIGH' })

		const dataSet = this.transformToDataSet({ low: lowEmissions, med: medEmissions, high: highEmissions, extra: extraHighEmissions })

		return (
			<div className='compare-container-wrapper'>
			<div>
				Sort by
				<Button onClick={() => this.setCompareMode('CO2')}>CO2</Button>
				<Button onClick={() => this.setCompareMode('CONSUMPTION')}>Consumption</Button>
			</div>
				<Sidebar
					defaultModels={ defaultModels }
					compareMode={ compareMode }
				/>
				<Bar
					data={dataSet}
				/>
			</div>
		)
	}
}

export default CompareContainer
