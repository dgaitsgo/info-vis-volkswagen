export {}

const Okapi = require('../Okapi')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')
const express = require('express')
const app = require('../app/app')
const addDays = require('date-fns/add_days')

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