import React, { Component } from 'react'
import {
	DiscreteColorLegend,
	XYPlot,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
	VerticalBarSeries,
	makeVisFlexible,
	ChartLabel,
	Hint
} from 'react-vis'
import '../style/barChart.css'

const ratio = .5;
class BarChart extends Component{

	constructor (props) {

		super(props)
		this.state = {
			value: null,
			height: 0,
			width: 0
		}
	}

	getInterpolations = ({ configurations, phase, compareMode}) => {
		return Object.keys(configurations).map((modelId, i) => {
			const config = configurations[modelId]

			if (config.wltp.length) {
				const currentInterps = config.wltp[0].interpolations
					.filter(interp => interp.value_type === compareMode && interp.phase === phase)
					.map( interp => interp.value)
					return ({
						value: currentInterps,
						name: config.model.name
					})
			} else {
				return ({
					value: null,
					name: config.model.name
				})
			}
		})
	}

	_forgetValue = () => this.setState({value: null})

	_rememberValue = value => this.setState({value: value.y})

	componentDidMount(){
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions)
	}
	componentWillMount(){
		window.removeEventListener('resize', this.updateWindowDimensions)
	}
	updateWindowDimensions = () => this.setState({width: window.innerHeight, height:window.innerHeight})

	phasesToLegendItems = () => {
		const { phases } = this.props

		return phases.map( phase => {
			return ({
				title: phase.label,
				color: phase.color,
				strokeWidth: 20
			})
		})
	}

	render() {
		const {
			configurations,
			compareMode,
			phases
		} = this.props

		const legendItems = this.phasesToLegendItems()

		const axisProps = {
			tickSizeInner: 0,
			style: {line: {stroke: '#939393', strokeWidth: '1px'}}
		}

		const dataSets = phases.map(phase => this.getInterpolations( { configurations, compareMode, phase: phase.key}))
		const normalizedDataSets = dataSets.map( dataSet => dataSet.filter( dp => dp.value).map( dp => ({ x: dp.name, y: dp.value })))

		//if you use flexibleXY you can't use animation
		const FlexibleXYPlot = makeVisFlexible(XYPlot)
		const { value } = this.state

		return (
			<div id='bar-chart-wrapper' className='bar-chart-wrapper'>
			<DiscreteColorLegend orientation="horizontal" items={legendItems}/>
				<FlexibleXYPlot
				margin={this.props.margin}
				height={this.state.height * ratio}
				xType='ordinal' >
					<VerticalGridLines />
					<HorizontalGridLines />
					<XAxis tickFormat={String} left={0}/>
					<YAxis {...axisProps}/>
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
					<ChartLabel text={compareMode === 'CO2' ? 'g/km' : 'l/100km'}
						className='alt-y-label'
						xPercent={0.00}
						yPercent={0.88}
						/>
						{value ? <Hint value={ value } 
						style={{
							fontSize: 14,
							text: {display: 'none'},
							value: {color: 'red'}}}>
							<div className='bar-chart-hint'>
								<p>value: {value}</p>
							</div>
					</Hint> : null}
				</FlexibleXYPlot>
			</div>
		)
	}
}

export default BarChart