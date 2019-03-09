/*
 * Navigation Component by Sebastian Kunz
*/
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import logoWhite from '../res/nav-vw-logo-white.png'
import logo from '../res/nav-vw-logo.png'
import { Button } from 'react-bulma-components/full'
import { Navbar } from 'react-bulma-components/full'
import { withRouter } from 'react-router-dom'
import '../style/navigation.css'

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
			open: true,
			color: "black",
			colorL: "light",
			logo: logo,
			logoW: logoWhite
        }
	}
    render() {
		const urlData = this.props.location.pathname.split('/')
		console.log(urlData);
		const open = this.state.open;
		const navColor = this.state.color;
		const navColorL = this.state.colorL;
		const logo = this.state.logo;
		const logoW = this.state.logoW;
        return (
			<Navbar
				color={urlData.length <= 2 && urlData[1] == "" ? navColor: navColorL}
				fixed="top"
				active={!open}
				transparent={false}
			>
				<Navbar.Brand>
					<Navbar.Item renderAs="a" href="/">
						<img
							src={urlData.length <= 2 && urlData[1] == "" ? logoWhite: logo}
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
								{urlData[1] == "explore" && <Navbar.Item href={`/${urlData[1]}`}>Country</Navbar.Item>}
								{urlData.length > 2 && <Navbar.Item href={`/${urlData[1]}/${urlData[2]}`}>Brands</Navbar.Item>}
								{urlData.length > 3 && <Navbar.Item href={`/${urlData[1]}/${urlData[2]}/${urlData[3]}`}>Models</Navbar.Item>}
								{urlData.length > 4 && <Navbar.Item href={`/${urlData[1]}/${urlData[2]}/${urlData[3]}/${urlData[4]}`}>Configure</Navbar.Item>}
				</Navbar.Menu>
		</Navbar>
		)
    }

}

export default withRouter(Navigation)
