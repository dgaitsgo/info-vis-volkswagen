const axios = require('axios')
const app = require('../services/app/app')
const apiURL = require('../constants/apiURL')
const sendJSON = require('../helpers/sendJSON')

app.get('/api/deleteAllConfigurations', async(req, res) => {

	const _token = req.query.token
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const url = `${apiURL}/configurations`

	try {

		const configurationsRes = await axios({
			method : 'get',
			url,
			headers: {
				'Authorization' : 'bearer ' + token.access_token,
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
		})

		const configurations = configurationsRes.data.data

		configurations.forEach(config => {

			const url = `${apiURL}/configurations/${config.id}`

			axios({
				method : 'delete',
				url,
				headers : {
					'Authorization' : 'bearer ' + token.access_token,
					'Accept' : 'application/json',
					'Content-Type' : 'application/json'
				}
			})
		})


	} catch (err) {

		if (!err.response) {
			console.log(err)
		}

		const { status, statusText, headers } = err.response

		console.error(status, statusText, headers)

		res.status(status).send({
			error : true,
			message: statusText,
			userMessage : `Could not get configurations.`
		})
	}
})

