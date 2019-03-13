import React from 'react'
import ModelsContainer from './containers/ModelsContainer'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

configure({adapter: new Adapter()})

describe('ModelsContainer', () => {
	const minProps = {
		location: {
			pathname: '/explore/DE/c65e5000-a5e0-5556-89e9-172a33f8f344'
		}
	}
	it('renders a ModelsContainer without exploding', () => {
		expect(
			shallow(
				<ModelsContainer {...minProps}/>
			).length
		).toEqual(1)
	})

	it('Done Button is deactivated', () => {

	})
})