import React, { Component } from 'react'
import ForceGraph3D from 'react-force-graph-3d';
import data from './data.js'
import { NavLink } from 'react-router-dom'

class GraphContainer extends Component {

	prepGData = ( data ) => {
		let res = {
			nodes: [],
			links: []
		}

		const colors = {
			"Audi": {
				lighter:'lightblue',
				darker:'darkblue'
			},
			"ŠKODA":{
				lighter:'lightblue',
				darker:'darkblue'
			},
			"Volkswagen Passenger Cars": {
				lighter:'lightblue',
				darker:'darkblue'
			},
			"Volkswagen Commercial Vehicles": {
				lighter:'lightblue',
				darker:'darkblue'
			},
			"SEAT": {
				lighter:'red',
				darker:'white'
			}
		}

		res.nodes.push({
			id: 'vw-group',
			name: "VW-Group",
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
					color: colors[brand.name].lighter,
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

	onNodeClick(node){
		// Aim at node from outside it
		const distance = node.size / 10;
		const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
		this.fg.cameraPosition(
		{
			x: node.x * distRatio,
			y: node.y * distRatio,
			z: node.z * distRatio
		}, // new position
			node, // lookAt ({ x, y, z })
			2000  // ms transition duration
		)
	}

	render() {

		const gData = this.prepGData(data)

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
					onNodeClick={ this.onNodeClick }
				/>
			</div>
		)
	}
}

export default GraphContainer
