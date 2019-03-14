import React, { Component } from 'react'
import {
	DiscreteColorLegend,
	XYPlot,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
	VerticalBarSeries,
	Hint,
	makeVisFlexible,
	ChartLabel,
  } from 'react-vis'
  import '../style/barChart.css'

  const ratio = 1;
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

	_forgetValue = () => {
		this.setState({
			value: null
		})
	}

	_rememberValue = value => {
		this.setState({value: value.y})
	}
	componentDidMount(){
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
	}
	componentWillMount(){
		window.removeEventListener("resize", this.updateWindowDimensions);
	}
	updateWindowDimensions = () =>{
		this.setState({width: window.innerHeight, height:window.innerHeight});
	}

	

	render() {
		const {
			configurations,
			compareMode,
			phases
		} = this.props

		const ITEMS = [
			{title: 'Low',color: '#4caf50', strokeWidth: 20},
			{title: 'Medium',color: '#ffeb3b', strokeWidth: 20},
			{title: 'High',color: '#ff9800', strokeWidth: 20},
			{title: 'Extra High',color: '#f44336', strokeWidth: 20},
			{title: 'Combined',color: '#1565c0', strokeWidth: 20}
		]
		
		const axisProps = {
			tickSizeInner: 0,
			style: {line: {stroke: '#939393', strokeWidth: '1px'}}
		}

		const dataSets = phases.map(phase => this.getInterpolations( { configurations, compareMode, phase: phase.key}))
		const normalizedDataSets = dataSets.map( dataSet => dataSet.filter( dp => dp.value).map( dp => ({ x: dp.name, y: dp.value })))
		const { value } = this.state
		//if you use flexibleXY you can't use animation
		const FlexibleXYPlot = makeVisFlexible(XYPlot)

		console.log('normalized datasets', normalizedDataSets)
			
		return (
			<div className='bar-chart-wrapper'>
			<DiscreteColorLegend orientation="horizontal" items={ITEMS}/>
				<FlexibleXYPlot
				margin={this.props.margin}
				height={this.state.height * ratio}
				xType="ordinal" 
				xDistance={100}>
					<VerticalGridLines />
					<HorizontalGridLines />
					<XAxis {...axisProps} tickFormat={String}/>
					<YAxis {...axisProps} tickFormat={(d) => d}/>
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
					
					<ChartLabel text="Car Name"
							className="alt-x-label"
							xPercent={0.8}
							yPercent={0.72}
					/>
					{/* : Fuel Comminsion(g/km)} */}
					<ChartLabel text="(l/100km)"
						className="alt-y-label"
						xPercent={0.04}
						yPercent={0.82}
						//style={{transform: 'rotate(-90)',textAnchor:'end'}}
						/>
					{value ? <Hint value={ value } style={{
							fontSize: 14,
							text: {display: 'none'},
							value: {color: 'red'}}}>
							<div>
								<p>value: {value}</p>
							</div>
					</Hint> : null}
				</FlexibleXYPlot>
			</div>
		)
	}
}

export default BarChart