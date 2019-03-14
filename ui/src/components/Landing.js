import React from 'react'
import emoji from '../modules/countryFlag'
import { NavLink } from 'react-router-dom'
import { Container, Columns, Heading, Section } from 'react-bulma-components/full'
import Modal from 'react-modal'
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

const Landing = ({ countries }) => {

	return (
		<div className='landing-wrapper'>
			<Section>
				<Container>
					<Heading size={4} className='has-text-centered'>
						Choose Your Country
					</Heading>
					<Columns className='is-centered'>
						{countries.map(({ countryCode, name }, i) => {
							const to = {
								pathname : `/explore/${countryCode}`,
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
		</div>
	)
}

export default Landing

