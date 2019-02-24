/*
 * Brands Component by Sebastian Kunz
*/

import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import 'react-dropdown-tree-select/dist/styles.css'

const Brands = (props) => {

	const { brand_id, name } = props

	return (
		<div className='brands-wrapper'>
			{ name }
		</div>
	)
}

export default withRouter(Brands)
