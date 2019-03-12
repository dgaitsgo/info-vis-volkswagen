const app = require('../app')
const axios = require('axios')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')

app.get('/api/checkBuild', async (req, res) => {

	const _token = req.query.token
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const { configId } = req.query

	console.log('checking build for : ', configId)

	try {
        
        const checkRes = await axios({
            method : 'get',
            url : `${apiURL}/configurations/${configId}/check`,
            headers : {
                'Authorization' : 'bearer ' + token.access_token,
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        })

		const { data } = checkRes

		sendJSON(res, { build : data })

	} catch (err) {

		console.error(err)		

        const { status, statusText, headers } = err.response

		console.error(status, statusText, headers)

		res.status(status).send({
			error : true,
			message: statusText,
			userMessage : `Could not get a new configuration.`
		})
	}
})