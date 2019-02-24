/*
 * Navigation Component by Sebastian Kunz
*/

import React from 'react'
import { NavLink } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Navbar } from 'react-bulma-components/full'
import { Button } from 'react-bulma-components/full'

const Navigation = () => {
	return (
		<Navbar 
			color="light"
			fixed = "fixed"
			active="true"
			transparent="false"
    	>
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="#">
          <img
            src="./vw-logo.jpg"
            alt="logo"
            width="112"
            height="112"
          />
        </Navbar.Item>
        <Navbar.Burger
        />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item href="#">Top</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          <Navbar.Item href="#">At the end</Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
	)
}

export default Navigation
