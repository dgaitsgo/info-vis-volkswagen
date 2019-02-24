/*
 * Component by Sebastian Kunz
*/

import React from 'react'
import emoji from '../modules/countryFlag'
import Modal from 'react-modal'
import { NavLink } from 'react-router-dom'
import { Button } from "react-bulma-components/full"
import { Section } from "react-bulma-components/full"
import { Heading } from "react-bulma-components/full"
import { Columns } from "react-bulma-components/full"
import { Container } from "react-bulma-components/full"

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

		<Columns.Column className='country-wrapper' onClick={ null}>

			<span className='country-flag'> { flag } </span>
			<span className='country-name'> { name } </span>
		</Columns.Column>
	)
}

const Landing = ({ onClickCountry, closeModal, openModal, modalIsOpen }) => {
	const { data } = countries;

	return (
		<div className='app'>
			<Section>
				<Container>
					<Heading size={4} className='has-text-centered'>Choose Your Country:</Heading>
					<header className='app-header'></header>
					<Columns>
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
					</Columns>
					</Container>
			</Section>

			<Modal
				size="lg"
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Example Modal"
				ariaHideApp={true}
			>
			<Section>
				<Heading size={2} className='modal-heaer has-text-centered'> Welcome To Our Website. </Heading>
				<p className='modal-body'> Pleace Chose Your Counrty first, then pick your favoriate modal to compare. </p>
				<br />
				<Button size="small" onClick={closeModal}>close</Button>
			</Section>
			</Modal>
		</div>
	)
}

export default Landing

