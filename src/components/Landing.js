/*
 * Component by Sebastian Kunz
*/

import React from 'react'
import emoji from '../modules/countryFlag'
import Modal from 'react-modal'
import { NavLink } from 'react-router-dom'

Modal.setAppElement('#root')

const Country = ({ name, countryCode, onClick }) => {
	const flag = emoji( countryCode )
	return (
		<div className='country-wrapper' onClick={() => onClick( countryCode )}>
			<span className='country-flag'> { flag } </span>
			<span className='country-name'> { name } </span>
		</div>
	)
}

const Landing = ({ onClickCountry, closeModal, openModal, modalIsOpen, countries }) => {

	if (!countries) {
		return null
	}

	return (
		<div className='landing'>
			{countries.map((country, i) =>
				<NavLink to={`/${country.countryCode.toLowerCase()}/brands`} key={i}>
					<Country {...country} onClick={onClickCountry}/>
				</NavLink>
			)}
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

