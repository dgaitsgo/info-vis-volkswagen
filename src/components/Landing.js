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
import '../style/landing.css'

Modal.setAppElement('#root')

const Country = ({ name, countryCode }) => {

	const flag = emoji( countryCode )

	return (
		<Columns.Column className='country-wrapper'>
			<span className='country-flag'> { flag } </span>
			<span className='country-name'> { name } </span>
		</Columns.Column>
	)
}

const Landing = ({ onClickCountry, closeModal, openModal, modalIsOpen, countries }) => {

	// if (!countries) {
	// 	return null
	// }

	return (
		<div className='app'>
			<Section>
				<Container>
					<Heading size={4} className='has-text-centered'>Choose Your Country:</Heading>
					<header className='app-header'></header>
					<Columns>
						{countries.map(({ countryCode, name }, i) => {

							const to = {
								pathname : `/${countryCode}/brands`,
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
				id="test"
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Example Modal"
				ariaHideApp={true}
			>
			<Section>
				{/* To impliment : Markdown 'About' */}
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

