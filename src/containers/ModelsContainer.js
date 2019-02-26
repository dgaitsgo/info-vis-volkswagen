import React, { Component } from 'react'
import axios from 'axios'
import { Loader } from 'react-bulma-components/full'
import Landing from '../components/Landing'
import Redirect from 'react-router-dom/Redirect'
import Model from '../components/Model'
import { NavLink } from 'react-router-dom'
import { Heading } from "react-bulma-components/full"
import { Section } from "react-bulma-components/full"
import { Container } from "react-bulma-components/full"
import { Button } from "react-bulma-components/full"
import { Columns } from "react-bulma-components/full"
import '../style/model.css'

class ModelsContainer extends Component {

    constructor(props) {

		super(props)

        this.state = {
			models: null,
			selectedModels: {},
			modelImages: null,
			imagesLoading: true,
			modelsLoading: true
        }
	}

    componentDidMount() {

		const urlData = this.props.location.pathname.split('/')

        axios.get('/api/models', {
            params : {
                countryCode: urlData[1],
                brand_id : urlData[2]
            }
        })
        .then( res => {
            const models = res.data.models.data
		// console.log(models)
            this.setState({ models, modelsLoading: false }, () =>{
				axios.get('/api/fullModels', {
					params: {
						models: models.map(({ id }) => ({ id }) )
					}
				})
				.then( res => {
					// console.log('res is', res)
					this.setState({ modelImages: res.data, imagesLoading: false })
				})
				.catch(err => {
					const to = {
						pathname : '/server-error',
						query : {
							err
						}
					}
					return <Redirect to={to} />
				})
			})
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

	onClickModel = id => {

		let { selectedModels } = this.state

		id in selectedModels
			? delete selectedModels[id]
			: selectedModels[id] = true

		this.setState({ selectedModels })
	}

    render() {

		const urlData = this.props.location.pathname.split('/')

		const {
			models,
			selectedModels,
			fullModels,
			imagesLoading,
			modelsLoading,
        } = this.state

        if (modelsLoading)
            return <Loader message={'Getting models...'} />

		const compareButtonClassName = selectedModels
			? 'compare-button has-text-centered active'
			: 'compare-button has-text-centered'

        return (
			<div className='models-wrapper'>
			<Section>
			<Container>
				<Heading size={4} className='models-header has-text-centered'>
					Select Models:
				</Heading>
				<div className='models-body'>
					<Columns className="is-centered">
					{models.map(({ id, name }, i) => {
						return (
							<Model key= { id }
								id={ id }
								name={ name }
								src={ imagesLoading ? null : fullModels[id].images[0].url }
								onClick= {this.onClickModel}
								selected={selectedModels[id]}
							/>
						)
					})}
					</Columns>
				</div>
				<br />
				<div className={compareButtonClassName}>
					<Button>
						<NavLink to={{
								pathname : `${this.props.location.pathname}/${JSON.stringify(selectedModels)}`
							}
						}>
						Done
					</NavLink>
					</Button>
				</div>
				</Container>
				</Section>
			</div>
        )
    }
}

export default ModelsContainer