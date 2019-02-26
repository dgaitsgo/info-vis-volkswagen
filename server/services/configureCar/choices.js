const app = require('../app')
const axios = require('axios')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')

app.get('/api/choices', async (req, res) => {

	const _token = req.query.token
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const { configurationId } = req.query

	console.log('getting chocies for', configurationId)

	try {
        
        // https://api.productdata.vwgroup.com/v2/configurations/e287d1b5-eff2-4f8c-b444-d521b197ea03/choices
		const url = `${apiURL}/configurations/${configurationId}/choices`

		const choicesRes = await axios({
			method: 'get',
			url,
			headers: {
				'Authorization' : 'bearer ' + token.access_token,
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			}
		})

		const { data } = choicesRes

		console.log('sending over', data)

		sendJSON(res, { token, choices : choicesRes.data.data })

	} catch (err) {

        const { status, statusText, headers } = err.response

		res.status(status).send({
			error : true,
			message: statusText,
			userMessage : `Could not get a new configuration.`
		})
	}
})