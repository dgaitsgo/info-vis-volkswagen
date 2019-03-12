export {}

const Okapi = require('../Okapi')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')
const express = require('express')
const app = require('../app/app')
const addDays = require('date-fns/add_days')

app.post('/api/makeConfigurations', async(req, res, next) => {

    const { token } = req.params
    const { models } = req.body

	try {
		
		// for all models
		const configIds = await Promise.all(models.map(async model => {

			// make a new configuration
			const newConfigRes = await Okapi.newConfiguration(model.id, token)
			const configId = newConfigRes.data.id

			return configId
		}))

		//for all the new configs
		const defaultOptions = await Promise.all(configIds.map( async (configId, i) => {

			// add type option
            await Okapi.addOption(configId, models[i].type.id)

			//get all of the options to complete the build
			const optionsToSetRes = await Okapi.resolveOptions(configId, token)
			const optionIds = optionsToSetRes.data.data.map(option => ({ id : option.id }))
			const defaultOptions = await Okapi.replaceOptions({ configId, optionIds, token })

			return (defaultOptions)
		}))

		const wltps = await Promise.all(configIds.map(configId => Okapi.getWLTP(configId, token)))
        const images = await Promise.all(configIds.map(configId => Okapi.getImages(configId, token)))

		const newConfigurations = models.map( (model, i : number) => ({
			model,
			configId : configIds[i],
			wltp  : wltps[i],
			images : images[i],
			selectedOptions : defaultOptions[i],
			expirationDate : addDays(new Date(), 1)
		}))

		sendJSON(res, { 'newConfigurations' : newConfigurations }) 
	
	} catch (e) {
		
		next(new Error(e))
	}
})