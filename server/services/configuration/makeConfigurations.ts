export {}

const Okapi = require('../Okapi')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')
const express = require('express')
const app = require('../app/app')
const addDays = require('date-fns/add_days')

app.post('/api/makeConfigurations', async(req, res, next) => {

    const { token } = req.query
	const models = req.body
	
	console.log('will be making the configs for', models)
	console.log('token : ', token.access_token)

	try {
		
		// for all models
		const configIds = await Promise.all(models.map(async model => {

			// make a new configuration
			const newConfigRes = await Okapi.newConfiguration(model.id, token)
			const configId = newConfigRes.data.id

			return configId
		}))

		console.log('Config Ids : ', configIds)

		//for all the new configs
		const defaultOptions = await Promise.all(configIds.map( async (configId, i) => {

			// add type option
            await Okapi.addOption(configId, models[i].type.id, token)

			//get all of the options to complete the build
			const optionsToSetRes = await Okapi.resolveOptions(configId, token)
			const optionIds = optionsToSetRes.data.data.map(option => ({ id : option.id }))
			const defaultOptionsRes = await Okapi.replaceOptions(configId, optionIds, token)
			const defaultOptions = defaultOptionsRes.data.data

			console.log('default options ', defaultOptions)

			return (defaultOptions)
		}))

		// console.log('default options[0]', defaultOptions[0])
		const wltpResults = await Promise.all(configIds.map(configId => Okapi.getWLTP(configId, token)))

		// console.log('wltp [0]', wltpResults[0].data)
        const imageResults = await Promise.all(configIds.map(configId => Okapi.getImages(configId, token)))

		// console.log('images [0]', imageResults[0].data)
		const newConfigurations = models.map( (model, i : number) => ({
			model,
			configId : configIds[i],
			wltp  : wltpResults[i].data.data,
			images : imageResults[i].data.data,
			selectedOptions : defaultOptions[i],
			defaultOptions : defaultOptions[i],
			expirationDate : addDays(new Date(), 1),
			build : { buildable : true, distinct : true }
		}))

		console.log('final : ', newConfigurations)

		sendJSON(res, { newConfigurations })
	
	} catch (e) {
		
		next(new Error(e))
	}
})