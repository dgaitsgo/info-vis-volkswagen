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
			<div className='country has-text-centered'>
				<p className='country-flag'> { flag } </p>
				<p className='country-name'> { name } </p>
			</div>
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
					<Columns>
						{countries.map(({ countryCode, name }, i) => {

							const to = {
								pathname : `/${countryCode}`,
								query : {
									previousPath: true
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
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Example Modal"
				ariaHideApp={true}
			>
			<Section>
				{/* To impliment : Markdown 'About' */}
				<Heading size={2} className='modal-heaer has-text-centered'> Welcome To Our Website. </Heading>
				<p className='modal-body'> Please choose your country first, then pick your favorite models and compare them. </p>
				<br />
				<Button size="small" onClick={closeModal}>close</Button>
			</Section>
			</Modal>
		</div>
	)
}

export default Landing

