const axios = require('axios')
const app = require('./app')
const apiURL = require('../constants/apiURL')
const sendJSON = require('../helpers/sendJSON')
const addHours = require('date-fns/add_hours')
const merge = require('lodash/merge')
const DefaultType = require('./db/models/DefaultType.model')

/*
	Target data set: for each model a default config

	configsMap = {
		model_id : config_id
	}
*/


//check if we have complete models
//build configurations for missing models
//see what options it needs to be complete
//add the options
//get the photos

	/*

Default configuration table :

right now, chained calls go as so:

- for each model, make a configuration
- for each configuration, resolve options
- for each configuration, replace options
- for each configuration, get WLTP values
- for each configuration, get an Image

nModels * 5
*/

app.get('/api/defaultModels', async(req, res, next) => {

	const { token, models } = req.params

	try {
		
		let missingDefaultModels = []
		let cachedDefaultModels = []

		//check if model is in database
		const modelsInDb = await Promise.all(models.map(model =>
			DefaultType.findOne({ model_id : model.id })))

		//seperate them to the appropriate places
		modelsInDb.forEach( (model, i) =>
			model
			? cachedDefaultModels.push(model)
			: missingDefaultModels.push(models[i]))
		
		// for all the missing models
		const configIds = await Promise.all(missingDefaultModels.map(async missingType => {

			// make a new configuration
			const newConfigRes = await Okapi.newConfiguration(missingType.id, token)
			const configId = newConfigRes.data.id

			return configId
		}))

		//for all the new configs
		const defaultOptions = await Promise.all(configIds.map( async configId => {

			//TO DO : addOption(typeId)

			//get all of the options to complete the build
			const optionsToSetRes = await Okapi.resolveOptions(apiURL, configId, token)
			const optionIds = optionsToSetRes.data.data.map(option => ({ id : option.id }))
			const defaultOptions = await Okapi.replaceOptions({ configId, optionIds, token })

			return (defaultOptions)
		}))

		const wltps = await Promise.all(configIds.map(configId => Okapi.getWLTP(configId, token)))
			
		const newDefaultModels = await DefaultType.insertMany(
			missingDefaultModels.map(( model, i ) => ({
				model_id : model.id,
				type_id : model.type.id,
				name : model.name,
				defaultOptions : defaultOptions[i].data.data,
				wltp : wltps[i].data.data,
			})))
		
		sendJSON(res, cachedDefaultModels.concat(newDefaultModels))
	
	} catch (err) {

		next()
	}
})