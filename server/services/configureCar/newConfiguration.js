const app = require('../app')
const axios = require('axios')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')

app.get('/api/newConfiguration', async (req, res) => {

	const _token = req.query.token
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const { model_id } = req.query

	try {
		
		const url = `${apiURL}/configurations`

		const newConfigurationRes = await axios({
			method: 'post',
			url,
			headers: {
				'Authorization' : 'bearer ' + token.access_token,
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			data : {
				model_id
			}
		})

		const { data } = newConfigurationRes

		sendJSON(res, { token, newConfiguration : data })

	} catch (err) {

        const { status, statusText, headers } = err.response

		console.error(status, statusText, headers)

		res.status(status).send({
			error : true,
			message: statusText,
			userMessage : `Could not get a new configuration.`
		})
	}
})