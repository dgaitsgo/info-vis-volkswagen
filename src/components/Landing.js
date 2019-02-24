/*
 * Component by Sebastian Kunz
*/

import React from 'react'
import emoji from '../modules/countryFlag'
import Modal from 'react-modal'
import { NavLink } from 'react-router-dom'

const countries = {"data":[{"countryCode":"SE",
"name":"Sweden"},
{"countryCode":"PT",
"name":"Portugal"},
{"countryCode":"IT",
"name":"Italy"},
{"countryCode":"NL",
"name":"Netherlands"},
{"countryCode":"PL",
"name":"Poland"},
{"countryCode":"LU",
"name":"Luxembourg"},
{"countryCode":"LV",
"name":"Latvia"},
{"countryCode":"LT",
"name":"Lithuania"},
{"countryCode":"IE",
"name":"Ireland"},
{"countryCode":"GB",
"name":"United Kingdom"},
{"countryCode":"FR",
"name":"France"},
{"countryCode":"ES",
"name":"Spain"},
{"countryCode":"EE",
"name":"Estonia"},
{"countryCode":"DK",
"name":"Denmark"},
{"countryCode":"DE",
"name":"Germany"},
{"countryCode":"CH",
"name":"Switzerland"},
{"countryCode":"BE",
"name":"Belgium"}],
"meta":{"count":17}}

Modal.setAppElement('#root')

const Country = ({ name, countryCode, onClick }) => {
	const flag = emoji( countryCode )
	return (
		<div className='country-wrapper' onClick={null}>
			<span className='country-flag'> { flag } </span>
			<span className='country-name'> { name } </span>
		</div>
	)
}

const Landing = ({ onClickCountry, closeModal, openModal, modalIsOpen }) => {
	const { data } = countries;

	return (
		<div className='app'>
			<header className='app-header'></header>
			{data.map(({ countryCode, name }, i) => {

				const to = {
					pathname : `/${name}/brands`,
					query : {
						countryCode,
						name
					}
				}

				return (
					<NavLink to={to} key={i}>
						<Country countryCode={countryCode} name={name} />
					</NavLink>
				)
			})}
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Example Modal"
				ariaHideApp={true}
			>
				<div className='modal-heaer'> Welcome </div>
				<div className='modal-body'> This application is this and that </div>
				<button onClick={closeModal}>close</button>
			</Modal>
		</div>
	)
}

export default Landing

