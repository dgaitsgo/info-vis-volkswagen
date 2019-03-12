const axios = require('axios')
const app = require('../app')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')

app.get('/api/configChoices', async(req, res) => {

	const _token = req.query.token
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const { configId } = req.query
    const url = `${apiURL}/configurations/${configId}/choices`

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

        sendJSON(res, { choices : data.data })
        
    } catch (err) {

            const { status, statusText, headers } = err.response
    
            res.status(status).send({
                error : true,
                message: statusText,
                userMessage : `Could not get configuration choices.`
            })
        }

})