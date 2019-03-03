import React, { Component } from 'react'
import axios from 'axios'
import Redirect from 'react-router-dom/Redirect'
import Options from '../components/Options'

class OptionsContainer extends Component {


	constructor(props) {
	
		super(props)
		this.state = {

			// initially loading all othe choices 
			loadingConfigOptions : true,

			//we're reloading the config after every addition and removal of options
			loadingConfig : false,

			loadingCheckBuild : false,

			//all the choices for a configuration
			choices : null,

			// let the user know if the build they have is configurable or not
			build : null
		}
	}

	addOption = (optionId) => {
	
		const { configId } = this.props

		this.setState({ loadingConfig : true }, () => {
			
			axios.get('/api/addOption'
				params : {
					configId,
					optionId
				}).then(res => {
					
					this.setState({ loadingConfig : false, loadingCheckBuild : true }, () => {
						this.checkBuild()
					})
			})
		})
		.catch(err => <Error />)	
	}

	removeOption = (optionId) => {

		const { configId } = this.props

		this.setState({ loadingConfig : true }, () => {

			axios.get('/api/removeOption',
				params : {
					configId,
					optionId
				}).then(res => {

					this.setState({ loadingConfig : false, loadingCheckBuild : true }, () => {
						this.checkBuild()
					})
				})
				.catch(err => <Error />)	
		})
	}

	rebuildConfig = () => {
		
		this.setState({ loadingConfig : true }, () => {
		
			axios.get('/api/rebuildConfig',
				params : {
					configId : props.configId	
				}).then(res => {
					
					this.setState({ loadingConfig : false }, this.getChoices)
				})
				.catch(err => <Error />)	
		})
	}

	checkBuild = () => {
	
		axios.get('/api/checkBuild'
			params : {
				conigId : props.configId
			}).then(res => {
				
				this.setState({ build : res.data })
			})
		})
		.catch(err => <Error />)
	}

	getChoices = () => {	
		
		axios.get('/api/choices', params : { configId }).then(res => {
		
			this.setState({
				loadingChoices : false,
				options: res.data		
			})

		})
		.catch(err => <Error />)	
	}


	componentDidMount() {
		this.getChoices()
	}

	render() {

		const { options } = this.state

		return (
			<div className='options-container-wrapper>
				<Options options={options} />
				<div className='button-group'>
					<Button onClick={onClickRestore}>Restore</Button>
					<Button onClick={onClickReady}>Ready</Button>
				</div>
			</div>
		)
	)

}

export default OptionsContainer
