/*
 * Navigation Component by Sebastian Kunz
*/

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../res/nav-vw-logo.png'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
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
    render() {
		const urlData = this.props.location.pathname.split('/')
		console.log(urlData.length)

		const navLabels = ['Brands', 'Models', 'Configure']

		const open = this.state.open;

        return (
			<Navbar
				color="light"
				fixed="top"
				active={!open}
				transparent={false}
			>
				<Navbar.Brand className='unordered-nav'>
					<Navbar.Item renderAs="a" href="/">
						<img
							src={logo}
							alt="logo"
							width = "112"
							height = "31"
						/>
					</Navbar.Item>
					<Navbar.Item>
						<Breadcrumb>
							<ul>
							{urlData.length > 1 &&
								<BreadcrumbItem>
									{urlData.length > 1 && <li> <NavLink to={'/explore'}>{ urlData[2] }</NavLink> </li>}
								</BreadcrumbItem>
							}
							{urlData.length > 3 &&
								<BreadcrumbItem>
									{urlData.length > 3 && <li> <NavLink to={`/explore/${urlData[2]}`}>Brands</NavLink> </li>}
								</BreadcrumbItem>
							}
							{urlData.length > 4 &&
								<BreadcrumbItem>
									{urlData.length > 4 && <li> <NavLink to={`/explore/${urlData[2]}/${urlData[3]}`}>Models</NavLink> </li>}
								</BreadcrumbItem>
							}
							{urlData.length > 2 &&
								<BreadcrumbItem>
									{ navLabels[urlData.length - 3] }
								</BreadcrumbItem>
							}
							</ul>
						</Breadcrumb>
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
				<Navbar.Menu active={open}>
				</Navbar.Menu>
		</Navbar>
		)
    }

}

export default withRouter(Navigation)
