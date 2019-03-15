export {} 

const Okapi = require('../Okapi')
const sendJSON = require('../../helpers/sendJSON')
const app = require('../app/app')

app.get('/api/restoreOptions', async(req, res, next) => {

	const { configId, token } = req.query

	try {
	
		const optionsToSetRes = await Okapi.resolveOptions(configId, token)

		const optionIds = optionsToSetRes.data.data.map(option => ({ id : option.id }))
		const defaultOptionsRes = await Okapi.replaceOptions(configId, optionIds, token)
		const defaultOptions = defaultOptionsRes.data.data

		sendJSON(res, { options : defaultOptions })

	} catch (e) {

		console.log(e)
		next(new Error(e))
		
	}
})
