/*
 * Brands Component by Sebastian Kunz
*/

import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import 'react-dropdown-tree-select/dist/styles.css'

import DropdownTreeSelect from 'react-dropdown-tree-select'

const Label = ( { name }) => {
	return (
		<div className='label'> { name } </div>
	)
}

const Checkbox = (props) => {
	return (
		<input type="checkbox" {...props} />
	)
}

const convertToTree = ( { brands, models }) =>
	brands.data.map(brand => ( {
			label: brand.name,
			value: brand.brand_id,
			children: models.data.map( (model) => ({
				label: model.name,
				value: model.id
			}))
		}))


const Brands = (props) => {

	const { brands } = props
	const { models } = props

	return (
		<div className='brands-wrapper'>
			<div className='brands-body'>
				Country: {props.location.query ? props.location.query.name : null}
				<DropdownTreeSelect
					data={convertToTree({brands, models})}
					onChange={ props.onChange }
					onAction={ props.onAction }
					onNodeToggle={ props.onNodeToggle }
					/>
			</div>
			<div className='compare-button' onClick={ () => props.onClickCompare}>
				Compare Vehicles
			</div>
		</div>
	)
}

export default withRouter(Brands)
