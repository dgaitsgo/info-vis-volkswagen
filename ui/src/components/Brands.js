import React from 'react'
import { Columns, Box } from "react-bulma-components/full"
import { withRouter } from 'react-router-dom'

// importing brand logos
import audi from '../res/audi-logo.png'
import vw_nutz from '../res/VW_Nutzfahrzeuge-logo.png'
import seat from '../res/Seat-logo.png'
import vw_pkw from '../res/vw-logo.png'
import skoda from '../res/Skoda-logo.png'

const Brands = ( { name }) => {

	const brandLogos = {
		"Audi": audi,
		"Volkswagen Nutzfahrzeuge": vw_nutz,
		"Seat": seat,
		"Volkswagen PKW": vw_pkw,
		"Skoda": skoda
	}

	return (
		<Columns.Column className='brand-wrapper has-text-centered'>
			<Box>
				<img src={brandLogos[name] || null} alt={`${brandLogos[name]} logo`} />
			</Box>
		</Columns.Column>
	)
}

export default withRouter(Brands)
