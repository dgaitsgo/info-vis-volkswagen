/*
 * Navigation Component by Sebastian Kunz
*/

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../res/nav-vw-logo.png'
// import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
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
				<Navbar.Brand className='unordered-nav'>	
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

				<Navbar.Menu active={open}>
					{urlData.map(( name, i ) => {
							return (
								<Navbar.Container position="left">
									<Navbar.Item href={urlData[i]}>{ name }</Navbar.Item>
								</Navbar.Container> 
							)
					})}	
									{/* {urlData[2] && <li> <NavLink to={`/${ urlData[1] }`}>Brands</NavLink> </li>} */}
									{/* {urlData[3] && <li> <NavLink to={`/${ urlData[1] }/${ urlData[2] }`}>Models</NavLink> </li>} */}
					{/* <Navbar.Container> */}
						{/* <Navbar.Item href={ urlData[1] }>
								{urlData[1] && <li> <NavLink to='/'></NavLink> </li>}	
									Countries
						</Navbar.Item> 
					</Navbar.Container>*/}
				</Navbar.Menu>
		</Navbar>
		)
    }

}

export default withRouter(Navigation)
