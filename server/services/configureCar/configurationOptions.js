const axios = require('axios')
const app = require('../app')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')

app.get('/api/configurationOptions', async(req, res) => {

	const _token = req.query.token
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const { configuration_id } = req.query
    const url = `${apiURL}/configurations/${configuration_id}/choices`

	try {

		const choicesRes = await axios({
			method: 'get',
			url,
			headers: {
				'Authorization' : 'bearer ' + token.access_token,
				'Accept' : 'application/json',
            }
        })

		const { data } = choicesRes

        sendJSON(res, { token, choices : data })
        
    } catch (err) {

            const { status, statusText, headers } = err.response
    
            res.status(status).send({
                error : true,
                message: statusText,
                userMessage : `Could not get configuration options.`
            })
        }

})