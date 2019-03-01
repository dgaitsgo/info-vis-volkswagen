import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Landing from '../components/Landing'
import Redirect from 'react-router-dom/Redirect'
import Brands from '../components/Brands'
import { NavLink } from 'react-router-dom'
import { Section } from "react-bulma-components/full"
import { Heading } from "react-bulma-components/full"
import { Container } from "react-bulma-components/full"
import { Columns } from "react-bulma-components/full"
import '../style/brand.css'

class BrandsContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
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
				<div className="loaders">
					<Loader
					style={{
						position:'fixed',
						width:300,
						height:300,
						border: '4px solid #01579b',
						borderTopColor: 'transparent',
						boderRightColor: 'transparent',
						margin: 'auto',
						top: '-50px',
						left: 0,
						bottom: 0,
						right: 0
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
							Choose A Brand:
						</Heading>
						<Columns className="is-centered">
							{brands.map(({ brand_id, name }, i) => {
								const to = {
									pathname: `${urlData[2]}/${brand_id}`,
									query: {
										brand_id,
										name
									}
								}
								return (
									<NavLink to={to} key={i}>
										<Brands
											name={ name }
											brand_id={ brand_id }
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
