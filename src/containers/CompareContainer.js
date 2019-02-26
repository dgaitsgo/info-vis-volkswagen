import React, { Component } from 'react'
import axios from 'axios'

import Modal from 'react-modal'
import { Loader } from 'react-bulma-components/full'
import Description from '../components/Description'
import Sidebar from '../components/Sidebar'
import Option from '../components/Option'
import ModelCard from '../components/ModelCard'

import Redirect from 'react-router-dom/Redirect'

/*
Getting:
	Name of car
		-All the default options
			-Description
			-id
*/

const models = [
	{
		name: 'fucker1',
		options: {
			id: '1',
			description: 'Nice ass'
		}
	},
	{
		id: '2',
		description: 'Nice Butt'
	},
	{
		id: '3',
		description: 'Nice popo'
	}
]

class CompareContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			fullModels : null,
			openModals: {}
		}
	}

    componentDidMount() {

    }

	render() {

		const {
			fullModels
		} = this.state

		// if (!fullModels) {
		// 	return (<Loader message="getting choices... "/> )
		// }

		return (
			// <div className='compare-container-wrapper'>
			// 	{ fullModels.map( (model, key) =>
			// 		<div key={`compare-${key}`} className='compare-model-wrapper'>
			// 			{ model.options.choices.map( (choice => {
			// 				// choice.map(())
			// 				return <div> NAME </div>
			// 			}))}
			// 			{/* { model.options.map( (name) => { */}
			// 				{/* return <div> name </div> */}
			// 			{/* }) } */}
			// 		</div>
			// 	)}
			// </div>

			<div className='compare-container-wrapper'>
				<div className='build-wrapper'>
					{models.forEach(model => {
						console.log(model)
						return (
							<ModelCard
								name={ model.name }
								options={ model.options }
							/>
						)
					})}
				</div>
			</div>
		)
	}
}

export default CompareContainer

// {/* foreach Selected Model: */}
// <div> NAME </div>
// <div className='cutomise-wrapper' onClick={() => {
// 	console.log(this.state.openModals)
// 	console.log("click")
// 		this.setState(this.openModals[{name:'RS 5'}]=true)
// 	}}>
// 	Customise Button
// 	<Modal
// 		isOpen={this.state.openModals[{name:'RS 5'}]}
// 	/>
// </div>

