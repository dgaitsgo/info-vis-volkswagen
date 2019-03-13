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
	}
	getInterpolations = ({ configurations, phase, compareMode}) => {
		return Object.keys(configurations).map((modelId, i) => {
			const model = configurations[modelId]
			if (model.wltp.length) {
				const currentInterps = model.wltp[0].interpolations
					.filter(interp => interp.value_type === compareMode && interp.phase === phase)
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
		const {
			configurations,
			compareMode,
			phases
		} = this.props

		const dataSets = phases.map(phase => this.getInterpolations( { configurations, compareMode, phase: phase.key}))
		const normalizedDataSets = dataSets.map( dataSet => dataSet.filter( dp => dp.value).map( dp => ({ x: dp.name, y: dp.value })))
		const { value } = this.state
		return (
			<div className='bar-chart-wrapper'>
				<XYPlot xType="ordinal" width={800} height={300} xDistance={800}>
					<VerticalGridLines />
					<HorizontalGridLines />
					<XAxis />
					<YAxis />
					{ normalizedDataSets.map( (dataSet, i) => {
						return <VerticalBarSeries
							className="vertical-bar-series-example"
							color={ phases[i].color}
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