
const axios = require('axios')
const app = require('../app')
const apiURL = require('../../constants/apiURL')

//check if we have complete models
//build configurations for missing models
//see what options it needs to be complete
//add the options
//get the photos

app.get('/api/fullModels', async(req, res) => {

	const _token = req.query.token
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const { models } = req.query
	const url = `${apiURL}/configurations`
	
	try {

		//Check if we have complete models
		const configurationsRes = await axios({
			method : 'get',
			url,
			headers: {
				'Authorization' : 'bearer ' + token.access_token,
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
		})

		const configurations = configurationsRes.data
		let configsMap = {}

		configurations.data.forEach(config => configsMap[config.model_id] = config)
		const missingModels = models.filter(model => !(configsMap[model.model_id]))

		//else, build a configuration
		const missingModelsRes = await Promise.all(
				missingModels.map( ({ name, model_id }) => {
						
				const newConfigUrl = `${apiURL}/configurations`

				return (axios({
					method: 'post',
					url : newConfigUrl,
					headers: {
						'Authorization' : 'bearer ' + token.access_token,
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					data : {
						model_id
					}
				}))
			})
		)
	
	//see what options it needs to be complete
	missingModels.res.map( )

	} catch (err) {

		const { status, statusText } = err.response

		console.error(status, statusText)

		res.status(status).send({
			error : true,
			message: statusText,
			userMessage : `Could not get a new configuration.`
		})
	}	

})
