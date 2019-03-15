export {} 

const Okapi = require('../Okapi')
const sendJSON = require('../../helpers/sendJSON')
const app = require('../app/app')

app.get('/api/recoverOptions', async(req, res, next) => {

	const { configId, token } = req.query

	console.log('Trying to get config Id for ', configId, token)

	console.log('Types : ', typeof(configId), typeof(token))
	console.log(typeof(token.access_token))

	try {
	
		const optionsToRecoverRes = await Okapi.recoverOptions(configId, token)

		console.log('Options to recover ', optionsToRecoverRes.data)

		const optionsToRecover = optionsToRecoverRes.data.data

		sendJSON(res, { options : optionsToRecover })

	} catch (e) {

		console.log(e)
		next(new Error(e))
		
	}
})
