/*
 * Component by Sebastian Kunz
*/

import React, { Component } from 'react'
import ForceGraph3D from 'react-force-graph-3d';
import data from './data.js'
import { NavLink } from 'react-router-dom'

class GraphContainer extends Component {

	constructor(){
		super()

		this.state = {
			isRotating: true
		}
	}

	prepGData = ( data ) => {
		let res = {
			nodes: [],
			links: []
		}

		// define brand and model colors
		const colors = {
			"Audi": {
				lighter: ['#ffee58', '#fff59d', '#fdd835', '#f9a825'],
				darker:'#f57f17'
			},
			"ŠKODA":{
				lighter: ['#43a047', '#66bb6a', '#a5d6a7', '#b9f6ca'],
				darker:'#2e7d32'
			},
			"Volkswagen Passenger Cars": {
				lighter: ['#1976d2', '#2196f3', '#64b5f6', '#bbdefb'],
				darker:'#0d47a1'
			},
			"Volkswagen Commercial Vehicles": {
				lighter: ['#1976d2 ', '#03a9f4', '#4fc3f7', '#b3e5fc'],
				darker:'#01579b'
			},
			"SEAT": {
				lighter: ['#d32f2f', '#f44336', '#e57373', '#ff8a80'],
				darker:'#b71c1c'
			}
		}

		// define center Node
		res.nodes.push({
			id:'vw-group',
			name:"VW-Group",
			color:'#e0e0e0',
			size: 10000
		})

		Object.keys(data).forEach( brandKey => {
			const brand = data[brandKey]

			res.nodes.push({
				id: brand.id,
				name: brand.name,
				color: colors[brand.name].darker,
				size: 1000,
			})
			res.links.push({
				source: 'vw-group',
				target: brand.id
			})
			brand.models.forEach( (model, i) => {
				res.nodes.push({
					id: `${brand.id}-${i}`,
					name: model.name,
					color: colors[brand.name].lighter[Math.floor(Math.random() * 3)],
					size: 100
				})
				res.links.push({
					source: `${brand.id}-${i}`,
					target: brand.id
				})
			})
		})
		return res
	}

	render() {
		const gData = this.prepGData(data)
		const distance = 500
		let angle = 0

		// setInterval(() => {
		// 	this.fg.cameraPosition({
		// 		x: distance * Math.sin(angle),
		// 		z: distance * Math.cos(angle)
		// 	});
		// 	angle += Math.PI / 300;
		// }, 30)

		return (
			<div className='graph-wrapper'>
				<NavLink to='/explore'>
					<span className='graph-title'>
						Explore the possibilities
					</span>
				</NavLink>
				<ForceGraph3D
					ref={el => { this.fg = el; }}
					graphData={ gData }
					nodeRelSize={ 1 }
					nodeColor='color'
					nodeVal='size'
					enableNavigationControls={ false }
					showNavInfo={ false }
				/>
			</div>
		)
	}
}

export default GraphContainer
