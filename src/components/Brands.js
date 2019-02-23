/*
 * Brands Component by Sebastian Kunz
*/

import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const brandsData = {"data":
[
	{"brand_id":"c65e5000-a5e0-5556-89e9-172a33f8f344","name":"Audi"},
	{"brand_id":"d943e4ad-329f-5c99-904b-92098209e211","name":"Volkswagen Nutzfahrzeuge"},
	{"brand_id":"fff2231f-aa29-5393-8005-552303ba30bd","name":"Seat"},
	{"brand_id":"d3f207e5-18d8-5bd2-a5fa-a1acc05629fa","name":"Volkswagen PKW"}
],
"meta":{"count":4}}

const Label = ( { name }) => {
	return (
		<div className='label'> { name } </div>
	)
}

const Brands = (props, onClickCompare) => {

	const { data } = brandsData

	return (
		<div className='brands-wrapper'>
			<div className='brands-body'>
				Country: {props.match.params.countryCode}
				{data.map((item, i) =>
				<NavLink to={`/${props.match.params.countryCode.toLowerCase()}/brands/${item.name}`} key={i}>
					<Label { ...item }/>
				</NavLink>

				)}
			</div>
			<div className='compare-button' onClick={ () => onClickCompare}>
				Compare Vehicles
			</div>
		</div>
	)
}

export default withRouter(Brands)