/*
 * Brands Component by Sebastian Kunz
*/

import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import 'react-dropdown-tree-select/dist/styles.css'
import audi from '../res/audi-logo.png'
import vw_nutz from '../res/VW_Nutzfahrzeuge-logo.png'
import seat from '../res/Seat-logo.png'
import vw_pkw from '../res/VW-logo.png'

const Brands = (props) => {

	const brandLogos = {
		"Audi": audi,
		"Volkswagen Nutzfahrzeuge": vw_nutz,
		"Seat": seat,
		"Volkswagen PKW": vw_pkw
	}

	const { brand_id, name } = props

	return (
		<div className='brand-wrapper'>
			<img src={brandLogos[name]} alt="Image"/>
			{ name }

		</div>
	)
}

export default withRouter(Brands)
