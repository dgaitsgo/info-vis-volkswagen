const app = require('../app')
const axios = require('axios')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')
const addDays = require('date-fns/add_days')

const replaceOptions = ({ configId, optionIds, token }) => {

	const data = optionIds
	const url = `${apiURL}/configurations/${configId}/options`

	return (axios.put(url, data, {
	 		headers : {
	 			'Authorization' : 'bearer ' + token.access_token,
				'Content-Type' : 'application/json',
				'Accept' : 'application/json'
	 		},
		 })
	)
}

app.get('/api/newConfiguration', async (req, res) => {

	const _token = req.query.token
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const {
		model_id,
		options
	} = req.query

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

		if (options) {
			let optionIds = options.map(option => JSON.parse(option))
			await replaceOptions({ configId : newConfigurationRes.data.id, optionIds, token })
		}

		let { data } = newConfigurationRes
		
		let newConfiguration = data
		newConfiguration.expirationDate = addDays(new Date(), 1).toISOString()

		sendJSON(res, { newConfiguration : data })

	} catch (err) {

        const { status, statusText, headers } = err.response

		res.status(400).send({
			error : true,
			message: statusText,
			userMessage : `Could not get a new configuration.`
		})
	}
})