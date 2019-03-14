const axios = require('axios')
const app = require('../services/app/app')
const apiURL = require('../constants/apiURL')
const sendJSON = require('../helpers/sendJSON')

app.get('/api/allUniqueModels', async(req, res) => {

	const _token = req.query.token
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const url = `${apiURL}/countries`

	try {

		const countriesRes = await axios({
			method : 'get',
			url,
			headers: {
				'Authorization' : 'bearer ' + token.access_token,
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
		})

		const countries = countriesRes.data.data

		console.log(countries)

		const results = await Promise.all(countries.map(country => {

			const url = `${apiURL}/catalog/${country.countryCode}/models`

			return (axios({
				method : 'get',
				url,
				headers : {
					'Authorization' : 'bearer ' + token.access_token,
					'Accept' : 'application/json',
					'Content-Type' : 'application/json'
				}
			}))			
		}))

		const allModels = results.map(result => result.data.data)
		console.log(allModels)

		sendJSON(res, allModels)

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

