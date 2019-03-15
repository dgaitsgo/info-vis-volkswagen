import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Redirect from 'react-router-dom/Redirect'
import Brands from '../components/Brands'
import { NavLink } from 'react-router-dom'
import { Section, Heading, Container, Columns } from "react-bulma-components/full"
import '../style/brand.css'
// import validatePath from '../../modules/validatePath'

class BrandsContainer extends Component {

    constructor(props) {
		super(props)

		this.state = {

			//all the brands that are available in the selected country
			brands : null,
			error: null
		}
	}

    async componentDidMount() {

			window.scrollTo(0, 0)

			try {

				const countryCode = this.props.location.pathname.split('/')[2]
	
				const brandsRes = await axios.get('/api/brands', { params : { countryCode } })
				
				if (brandsRes && brandsRes.data) {
					this.setState({ brands: brandsRes.data.brands.data })
				}
				
		} catch ({ err, message }) {
					this.setState({ error : { err, message } })
			}
		}

    render() {

			const { error } = this.state
		  const urlData = this.props.location.pathname.split('/')

			if ( error )
				return (
					<Redirect to={ { pathname : '/server-error', params : error.message } } />
				)

		const {
            brands
        } = this.state

        if (!brands) {
          return <div className='loaders'>
						<Loader
							style={{
								borderTopColor: 'transparent',
								boderRightColor: 'transparent',
							}}
						/>
						<Heading className='loader-msg' size={4}>Getting Brands...</Heading>
					</div>
		}
		return (
			<div className='brands-wrapper'>
				<Section>
					<Container>
						<Heading className='brands-headline has-text-centered' size={4}>
							Choose A Brand
						</Heading>
						<Columns className="is-centered">
							{brands.map(({ brand_id, name }, i) => {
								const to = {
									pathname: `/explore/${urlData[2]}/${brand_id}`,
									query: {
										brand_id,
										name
									}
								}
								return (
									<NavLink to={to} key={i}>
										<Brands
											name={ name }
										/>
									</NavLink>
								)
							})}
						</Columns>
					</Container>
				</Section>
			</div>
		)
	}
}

export default BrandsContainer
