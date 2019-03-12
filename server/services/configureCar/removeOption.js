const app = require('../app')
const axios = require('axios')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')

app.get('/api/removeOption', async (req, res) => {

    const _token = req.query.token
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
    const { configId, optionId } = req.query
    
    const nextOptionsRes = await axios({
        method : 'delete',
        url : `${apiURL}/configurations/${configId}/options`,
        headers : {
            'Authorization' : 'bearer ' + token.access_token,
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        data : {
            id : optionId
        }
    })

    sendJSON(res, { nextOptions : nextOptionsRes.data.data })

})