import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Description from '../components/Description'
import Sidebar from '../components/Sidebar'
import Option from '../components/Option'

class CompareContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			selectedModels: JSON.parse(this.props.location.pathname.split('/')[3])
		}

		console.log(this.state.selectedModels)
	}

    // componentDidMount() {

		// const countryCode = this.props.location.pathname.split('/')[1]

        // axios.get('/api/brands', {
		// 	params : {
		// 		countryCode
		// 	}
		// }).then(res => {

		// 	const brands = res.data.brands.data

		// 	this.setState({ brands })
		// })
		// .catch(err => {
		// 	const to = {
		// 		pathname : '/server-error',
		// 		query : {
		// 			err
		// 		}
		// 	}
		// 	return (
		// 		<Redirect to={to} />
		// 	)
		// })
    // }

	render() {
		return (
			<div className='compare-container-wrapper'>
				<Sidebar />
				<Description
					text="Example Description"
				/>
				<Option />
			</div>
		)
	}
}

export default CompareContainer
