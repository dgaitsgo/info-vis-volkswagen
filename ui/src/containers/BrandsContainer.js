import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Redirect from 'react-router-dom/Redirect'
import Brands from '../components/Brands'
import { NavLink } from 'react-router-dom'
import { Section, Heading, Container, Columns } from "react-bulma-components/full"
import '../style/brand.css'

class BrandsContainer extends Component {

    constructor(props) {
		super(props)

        this.state = {
			//all the brands that are available in the selected country
			brands : null,
        }
	}

    componentDidMount() {
		const countryCode = this.props.location.pathname.split('/')[2]
        axios.get('/api/brands', {
			params : {
				countryCode
			}
		}).then(res => this.setState({ brands: res.data.brands.data }))
		.catch(err => {
			const to = {
				pathname : '/server-error',
				query : {
					err
				}
			}
			return (
				<Redirect to={to} />
			)
		})
    }

    render() {

		const urlData = this.props.location.pathname.split('/')

		const {
            brands
        } = this.state

        if (!brands) {
            return (
				<div className='loaders'>
					<Loader
					style={{
						borderTopColor: 'transparent',
						boderRightColor: 'transparent',
					}}
					message={'Getting brands...'} />
				</div>
            )
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
