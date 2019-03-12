import logoWhite from '../res/nav-vw-logo-white.png'
import logo from '../res/nav-vw-logo.png'

import React, { Component } from 'react'
import { Navbar } from 'react-bulma-components/full'
import { withRouter, NavLink } from 'react-router-dom'
import '../style/navigation.css'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
			open: true,
        }
	}

    render() {
		const urlData = this.props.location.pathname.split('/')
		const isGraphPage = urlData[1] === ''
		const { open } = this.state

        return (
			<Navbar
				color={isGraphPage ? 'black' : 'light' }
				fixed='top'
				active={!open}
				transparent={false}
			>
				<Navbar.Brand>
					<NavLink className='navbar-item' to='/'>
						<img
							src={isGraphPage ? logoWhite :  logo}
							alt='logo'
							width = '112'
							height = '31'
						/>
					</NavLink>
					<Navbar.Burger
						active={open}
						onClick={() => this.setState({ open: !this.state.open })}
					/>
				</Navbar.Brand>
				<Navbar.Menu active={open}>
					{urlData.length > 2 &&
						<NavLink className='navbar-item' to={`/${urlData[1]}`}>
							<div>Country</div>
						</NavLink>}
					{urlData.length > 3 &&
						<NavLink className='navbar-item' to={`/${urlData[1]}/${urlData[2]}`}>
							<div>Brands</div>
						</NavLink>}
					{urlData.length > 4 &&
						<NavLink className='navbar-item' to={`/${urlData[1]}/${urlData[2]}/${urlData[3]}`}>
							<div>Models</div>
						</NavLink>}
				</Navbar.Menu>
			</Navbar>
		)
    }
}

export default withRouter(Navigation)
