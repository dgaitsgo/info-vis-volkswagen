export {}

const Okapi = require('../Okapi')
const sendJSON = require('../../helpers/sendJSON')
const app = require('../app/app')

app.get('/api/removeOption', async (req, res, next) => {

    const { configId, optionId, token } = req.query
   
    console.log('removing', optionId, 'from', configId)
 
    try {
       
	const nextOptionsRes = await Okapi.removeOption(configId, optionId, token)
	if (nextOptionsRes.data) {
	
		console.log('next option res', nextOptionsRes.data) 
        	sendJSON(res, { options : nextOptionsRes.data.data })
	}

	throw ('Could not remove option')

    } catch (e) {

	console.log('wtf error', e)
	
        next(new Error(e))
    }
})
