import app from '../app/app'
import sendJSON from '../../helpers/sendJSON'
import addDays from 'date-fns/add_days'
import Okapi from '../Okapi'

app.get('/api/newConfiguration', async (req, res, next) => {

	const { modelId, options, token } = req.query

	try {
		
		const newConfigurationRes = await Okapi.newConfiguration(modelId, token)
		let newConfiguration = newConfigurationRes.data
		const configId = newConfiguration.id

		if (options) {
			await Okapi.replaceOptions(configId, options, token)
		}

		newConfiguration.expirationDate = addDays(new Date(), 1).toISOString()
		sendJSON(res, { newConfiguration })

	} catch (err) {

		next(new Error(err))
	}
})