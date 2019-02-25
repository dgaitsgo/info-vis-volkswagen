import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Description from '../components/Description'
import Sidebar from '../components/Sidebar'
import Option from '../components/Option'
import Redirect from 'react-router-dom/Redirect'

class CompareContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			focusedModel: null,
			urlData: null,
			selectedModels: null,
		}

	}

    componentDidMount() {

		this.urlData = this.props.location.pathname.split('/')
		this.selectedModels = JSON.parse(this.urlData[3])
		console.log(this.urlData)
		console.log(this.selectedModels)
		console.log(this.selectedModels)

        // axios.get('/api/options', {
		// 	params : {
		// 	}
		// }).then(res => {


		// 	// this.setState({ brands })
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
    }

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
