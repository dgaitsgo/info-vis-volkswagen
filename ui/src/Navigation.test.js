import React from 'react'
import Navigation from './components/Navigation'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})

describe('Navigation', () => {
	const minProps = {
		location: {
			pathname: '/explore/DE/c65e5000-a5e0-5556-89e9-172a33f8f344'
		}
	}
	it('renders a NavBar without exploding', () => {

		expect(
			shallow(
				<Navigation {...minProps}/>
			).length
		).toEqual(1)
	})

	it('NavBar is dark on GrapPage', () => {
		// const wrapper = mount(<Navigation {...minProps}/>)

		// console.log(wrapper.debug())

		// expect(
		// 	wrapper.find('Navbar').length
		// ).toEqual(1)
	})
})