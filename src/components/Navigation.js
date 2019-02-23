/*
 * Navigation Component by Sebastian Kunz
*/

import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {

	return (
		<div className='navigation-wrapper'>
			<NavLink to="/">Choose Country</NavLink>
			<NavLink to="/">Vehicles</NavLink>
			<NavLink to="/compare">Compare</NavLink>
		</div>
	)
}

export default Navigation
