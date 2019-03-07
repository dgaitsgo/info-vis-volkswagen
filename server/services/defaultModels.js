const axios = require('axios')
const app = require('./app')
const apiURL = require('../constants/apiURL')
const sendJSON = require('../helpers/sendJSON')
const addHours = require('date-fns/add_hours')
const merge = require('lodash/merge')
const DefaultModel = require('./db/models/DefaultModel.model')

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

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

const getConfigurations = (url, token) =>
	axios({
		method : 'get',
		url,
		headers: {
			'Authorization' : 'bearer ' + token.access_token,
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
	})

const makeConfiguration = (url, model_id, token) =>
	axios({
		method: 'post',
		url,
		headers: {
			'Authorization' : 'bearer ' + token.access_token,
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		data : {
			model_id
		}
	})


const checkBuild = (url, configId, token) =>
	axios({
		method : 'get',
		url : `${apiURL}/configurations/${configId}/check`,
		headers : {
			'Authorization' : 'bearer ' + token.access_token,
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		}
	})

const resolveOptions = (apiURL, configId, token) =>
	axios({
		method : 'get',
		url : `${apiURL}/configurations/${configId}/options?resolve=true`,
		headers : {
			'Authorization' : 'bearer ' + token.access_token,
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		}
	})

const getOptions = ({ configId, token }) =>
	axios({
		method : 'get',
		url : `${apiURL}/configurations/${configId}/options`,
		headers : {
			'Authorization' : 'bearer ' + token.access_token,
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		}
})

const getWLTP = ({ configId, token }) =>
	axios({
		method : 'get',
		url : `${apiURL}/configurations/${configId}/wltp`,
		headers : {
			'Authorization' : 'bearer ' + token.access_token,
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		}
})

const getImages = ({ configId, token }) =>
	axios({
		method : 'get',
		url : `${apiURL}/configurations/${configId}/images`,
		headers : {
			'Authorization' : 'bearer ' + token.access_token,
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		}
})

const replaceOptions = ({ configId, optionIds, token }) => {

	const data = JSON.stringify(optionIds)
	const url = `${apiURL}/configurations/${configId}/options`

	return (axios.put(url, data, {
	 		headers : {
	 			'Authorization' : 'bearer ' + token.access_token,
				'Content-Type' : 'application/json',
				'Accept' : 'application/json'
	 		},
		 })
	)
}

const addOption = (apiURL, configId, optionId, token) =>
	axios({
		method : 'post',
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

app.get('/api/defaultModels', async(req, res) => {

	const _token = req.query.token
	const modelsParam = req.query.models
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const _models = typeof(modelsParam) === 'string' ? JSON.parse(modelsParam) : modelsParam
	const models = _models.map(model => typeof(model) === 'string' ? JSON.parse(model) : model)
	
	console.log('api - getting default for ', models)

	try {
		
		let missingDefaultModels = []
		let cachedDefaultModels = []

		//check if model is in database
		const modelsInDb = await Promise.all(models.map(model =>
			DefaultModel.findOne({ model_id : model.id })))

		//seperate them to the appropriate places
		modelsInDb.forEach( (model, i) =>
			model
			? cachedDefaultModels.push(model)
			: missingDefaultModels.push(models[i]))

		console.log('CACHED MODELS : ', cachedDefaultModels)
		console.log('MISSING MODELS : ', missingDefaultModels)

		const configsURL = `${apiURL}/configurations`

		// for all the missing models
		const configIds = await Promise.all(missingDefaultModels.map(async missingModel => {

			// make a new configuration
			const newConfigRes = await makeConfiguration(configsURL, missingModel.id, token)
			const configId = newConfigRes.data.id

			return configId
		}))

		//for all the new configs
		const defaultOptions = await Promise.all(configIds.map( async configId => {

			//get all of the options to complete the build
			const optionsToSetRes = await resolveOptions(apiURL, configId, token)
			const optionIds = optionsToSetRes.data.data.map(option => ({ id : option.id }))
			const defaultOptions = await replaceOptions({ configId, optionIds, token })

			return (defaultOptions)
		}))

		const wltps = await Promise.all(configIds.map(configId => getWLTP({ configId, token })))
			
		const newDefaultModels = await DefaultModel.insertMany(
			missingDefaultModels.map((model, i) => ({
				model_id : model.id,
				name : model.name,
				defaultOptions : defaultOptions[i].data.data,
				wltp : wltps[i].data.data,
			})))
		
		console.log('cached and new together', cachedDefaultModels, newDefaultModels)

		sendJSON(res, cachedDefaultModels.concat(newDefaultModels))
	
	} catch (err) {

		console.log(err)

		if (!err.response) {
			return ;
		}

		const { status, statusText, headers } = err.response || {}

		console.error(status, statusText, headers)

		res.status(status).send({
			error : true,
			message: statusText,
			userMessage : `Could not get a new configuration.`
		})
	}
})

// console.log(err)
// console.log(configOptionsMap)
// configOptionsMap[model.id] = {}
// configOptionsMap[model.id].model = model
// configOptionsMap[model.id].defaultOptions = defaultOptions[i].data
// configOptionsMap[model.id].wltp = wltps[i].data
// configOptionsMap[model.id].images = images[i].data
// configOptionsMap[model.id].configId = configIds[i]
// Promise.all(configIds.map(configId => getImages({ configId, token })))