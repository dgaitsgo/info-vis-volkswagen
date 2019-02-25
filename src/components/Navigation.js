/*
 * Navigation Component by Sebastian Kunz
*/

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../res/nav-vw-logo.png'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Field, Control } from 'react-bulma-components/full'
import { Button } from 'react-bulma-components/full'
import { Navbar } from 'react-bulma-components/full'
import { withRouter } from 'react-router-dom'
import '../style/navigation.css'

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        }
    }
    render(){
        const urlData = this.props.location.pathname.split('/')
		const open = this.state.open;

        return (
			<Navbar
				color="light"
				fixed="top"
				active={!open}
				transparent={false}
			>
				<Navbar.Brand>
					<Navbar.Item renderAs="a" href="/">
						<img
						src={logo}
						alt="logo"
						width = "112"
						height = "31"
						/>
					</Navbar.Item>
					<Navbar.Burger
						active={open}
						onClick={() =>
							this.setState({
							open: !this.state.open
							})
						}
					/>
				</Navbar.Brand>
						{/* <Navbar.Item >
							<Breadcrumb>
								<NavLink to='/'>{ urlData[1] }</NavLink>
								{/* <NavLink to='/'> Brands </NavLink> */}
							{/* </Breadcrumb> */}
						{/* </Navbar.Item> */}
				<Navbar.Menu active={open}>
					<Navbar.Container>
					</Navbar.Container>
					<Navbar.Container position="end">
						<Navbar.Item href="#">At the end</Navbar.Item>
					</Navbar.Container>
				</Navbar.Menu>
		</Navbar>
		)
    }

}

export default withRouter(Navigation)
