/*
 * Navigation Component by Sebastian Kunz
*/

import React from 'react'
import { NavLink } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { withRouter } from 'react-router-dom'

const Navigation = (props) => {

	const url = props.location.pathname.split('/')
	const country = url[1]
	const brands = url[2]
	return (
		<div className='navigation-wrapper'>
			<Breadcrumb>
				<NavLink to='/'>{ country }</NavLink>
				{/* <NavLink to={`/${country}/brands`}> { brands }</NavLink> */}
			</Breadcrumb>
		</div>
	)
}

export default withRouter(Navigation)
