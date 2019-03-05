import React, { Component } from 'react'
import {
	XYPlot,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
	VerticalBarSeries,
	VerticalBarSeriesCanvas,
	LabelSeries,
	MarkSeries,
	Hint
  } from 'react-vis'

class BarChart extends Component{

	constructor (props) {

		super(props)
		this.state = {
			value: null,
		}

		this.phases = [
			{ key : 'LOW', color : '#4caf50', label : 'Low' },
			{ key : 'MEDIUM', color : '#ffeb3b', label : 'Medium' },
			{ key : 'HIGH', color : '#ff9800', label : 'High' },
			{ key : 'EXTRA_HIGH', color : '#f44336', label : 'Extra High' }
		]
	}
	getInterpolations = ({ fullModels, phase, compareMode}) => {

		return Object.keys(fullModels.data).map( (modelId, i) => {

			const model = fullModels.data[modelId]

			if (model.wltp.data.length) {

				const currentInterps = model.wltp.data[0].interpolations
					.filter(interp => interp.value_type === compareMode && interp.phase == phase)
					.map( interp => interp.value)

					return ({
						value: currentInterps,
						name: model.model.name
					})
			} else {
				return ({
					value: null,
					name: model.model.name
				})
			}
		})
	}

	_forgetValue = () => {
		this.setState({
			value: null
		})
	}

	_rememberValue = value => {
		this.setState({value: value.y})
	}

	render() {

		const { fullModels, compareMode } = this.props

		const dataSets = this.phases.map(phase => this.getInterpolations( { fullModels, compareMode, phase: phase.key}))
		const normalizedDataSets = dataSets.map( dataSet => dataSet.filter( dp => dp.value).map( dp => ({ x: dp.name, y: dp.value })))

		const { value } = this.state

		return (
			<div className='bar-chart-wrapper'>
				<XYPlot xType="ordinal" width={500} height={300} xDistance={500}>
					<VerticalGridLines />
					<HorizontalGridLines />
					<XAxis />
					<YAxis />
					{ normalizedDataSets.map( (dataSet, i) => {
						return <VerticalBarSeries
							className="vertical-bar-series-example"
							color={this.phases[i].color}
							data={dataSet}
							key={i}
							onValueMouseOver={this._rememberValue}
							onValueMouseOut={this._forgetValue}
						/>
					}) }
					{/* <LabelSeries data={ data[0] }  /> */}
					{value ? <Hint value={ value } /> : null}
					</XYPlot>
			</div>
		)
	}
}

export default BarChart