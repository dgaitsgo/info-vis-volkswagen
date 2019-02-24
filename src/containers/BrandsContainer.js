import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Landing from '../components/Landing'
import Redirect from 'react-router-dom/Redirect'
import Brands from '../components/Brands'
import { NavLink } from 'react-router-dom'

/*
const brandsData = {"data":
[
	{"brand_id":"c65e5000-a5e0-5556-89e9-172a33f8f344","name":"Audi"},
	{"brand_id":"d943e4ad-329f-5c99-904b-92098209e211","name":"Volkswagen Nutzfahrzeuge"},
	{"brand_id":"fff2231f-aa29-5393-8005-552303ba30bd","name":"Seat"},
	{"brand_id":"d3f207e5-18d8-5bd2-a5fa-a1acc05629fa","name":"Volkswagen PKW"}
],
"meta":{"count":4}}

const models = {"data":
[
	{"id":"7f226e25-10db-5c11-8b2e-2f0e1c377b9a","name":"A1 Sportback"},
	{"id":"058ce52b-75d6-516e-8cec-e2247a0071f3","name":"Q2"},
	{"id":"7144f2ae-a992-5d30-b61e-cccf0ebbae43","name":"SQ2"},
	{"id":"185366f3-cf59-5889-a833-64142f1e987d","name":"TT Coupé"},
	{"id":"fdda1851-09f5-5189-99a8-4656ff1bc02e","name":"TT Roadster"},
	{"id":"f6e4e8fd-c9e4-523f-b5e1-54942eb65940","name":"TTS"},
	{"id":"58bd5997-c17e-5453-a733-84997272c5c2","name":"TT RS"},
	{"id":"a86796a2-09c6-51af-a070-41df34d03f71","name":"A3 Sportback"},
	{"id":"eea4772a-8579-56a0-bcae-3e630cc2fe9c","name":"A3 Sedan"},
	{"id":"0aada4fe-10b5-550a-8012-3667cf3b8122","name":"A3 Cabriolet"},
	{"id":"845dacb5-a46e-5a59-a772-4ac6d65fbff2","name":"S3"},
	{"id":"16874f75-1d06-50f4-9760-ed93275b39b8","name":"RS 3"},
	{"id":"9e23fefc-ea07-50d7-9e1f-ae47a9caebe0","name":"Q3"},
	{"id":"5cc0dd2e-c817-59e7-9272-5452da97d694","name":"A4"},
	{"id":"e96829a8-c829-5fba-b85d-b7225b3d7f35","name":"A4 Avant"},
	{"id":"c6e5fa61-ec6d-5f89-8859-13297d15b268","name":"A4 allroad quattro"},
	{"id":"0ce46735-2335-5d5c-90e7-43cf0e5340d5","name":"RS 4 Avant"},
	{"id":"6d6ff048-a851-5b35-b5ad-16196ab8f3ef","name":"A5 Coupé"},
	{"id":"4ca17033-2823-5224-a49f-3427ce442e27","name":"A5 Sportback"},
	{"id":"f4f55680-7e00-5e46-9178-ac68211a8f4e","name":"A5 Cabriolet"},
	{"id":"cbdf709b-185c-5e5c-a4b0-3dbe94df7109","name":"RS 5"},
	{"id":"1070732f-5195-5b2d-bbfd-1c42a9529e72","name":"Q5"},
	{"id":"6928e1da-93f0-5246-b3a3-6b17e64b0378","name":"SQ5"},
	{"id":"c5a3c728-f117-54fc-aba8-9b6e81f3029d","name":"A6"},
	{"id":"2fb602e1-eda3-55be-aba9-84339d037f09","name":"A6 Avant"},
	{"id":"39bb74a2-b4ce-5b4a-bbb7-15f8c40c71d6","name":"A7 Sportback"},
	{"id":"42da7c17-1576-52a4-99cd-f494a8e2fba7","name":"Q7"},
	{"id":"1ce70e46-91c3-5528-a7f7-4faf1ba79226","name":"Q8"},
	{"id":"c53a5232-e367-5fd2-b9ce-978f9ed7cb2c","name":"A8"},
	{"id":"36164252-b8df-540f-a800-c54be1c535e2","name":"e-tron"}
],
"meta":{"count":30}}
*/

class BrandsContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			brands : null,
        }
	}

    componentDidMount() {

		const countryCode = this.props.location.pathname.split('/')[1]

        axios.get('/api/brands', {
			params : {
				countryCode
			}
		}).then(res => {

			const brands = res.data.brands.data

			this.setState({ brands })
		})
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
                <Loader message={'Getting brands...'} />
            )
		}
		return (
			<div className='brands-wrapper'>
				<div className='brands-headline'>
					Choose a Brand
				</div>
				{brands.map(({ brand_id, name }, i) => {

					const to = {
						pathname : `/${urlData[1]}/brands/${brand_id}`,
						query : {
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
			</div>
		)
	}
}

export default BrandsContainer