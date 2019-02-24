const axios = require('axios')
const app = require('../app')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')

app.get('/api/options', async(req, res) => {

	const _token = req.query.token
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const { configuration_id } = req.query

    const url = `${apiURL}/configurations/${configuration_id}/choices`
    console.log('my config id', configuration_id)
    console.log(url)

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
    
            console.error('punk ass', status, statusText, headers)
    
            res.status(status).send({
                error : true,
                message: statusText,
                userMessage : `Could not get a options.`
            })
        }

})