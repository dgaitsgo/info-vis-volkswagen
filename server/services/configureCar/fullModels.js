
const axios = require('axios')
const app = require('../app')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')
const db = require('../database')
const addHours = require('date-fns/add_hours')

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

const getImages = (apiURL, configId, token) =>
	axios({
		method : 'get',
		url : `${apiURL}/configurations/${configId}/images`,
		headers : {
			'Authorization' : 'bearer ' + token.access_token,
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		}
	})


app.get('/api/fullModels', async(req, res) => {

	const _token = req.query.token
	const modelsParam = req.query.models
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const _models = typeof(modelsParam) === 'string' ? JSON.parse(modelsParam) : modelsParam
	const models = _models.map(model => JSON.parse(model))

	let cachedModels = {}
	let newEntries = {}
	let now = (new Date()).toISOString()
	let configsMap = {}

	console.log('recieving models : ', models)

	try {

		const configsURL = `${apiURL}/configurations`
		const missingModels = models.filter( model => {

			let modelInDb = db.get('DefaultConfigs').find({ id : model.id }).value()
			let missing = false
			console.log('model in DB : ', modelInDb)

			if (modelInDb) {

				if (now > modelInDb.expirationDate || !modelInDb.images) {
					missing = true
					db('DefaultConfigs').remove(model.id)
					newEntries[model.id] = {
						id : model.id
					}
				} else {
					cachedModels[model.id] = modelInDb
				}
			} else {
				missing = true
				newEntries[model.id] = {
					id : model.id
				}
			}

			return (missing)
		})

		// for all the missing models
		const configIds = await Promise.all(missingModels.map(async model => {

			// make a new configuration
			const newConfigRes = await makeConfiguration(configsURL, model.id, token)
			const configId = newConfigRes.data.id

			/* SET MODEL ID */
			/* SET EXPIRATION DATE */
			newEntries[model.id].configId = configId
			newEntries[model.id].expirationDate = addHours(now, 24)

			return configId
		}))

		console.log('new config ids : ', configIds)

		//for all the new configs
		await Promise.all(configIds.map( async configId => {

			//get all of the options to complete the build
			const optionsToSetRes = await resolveOptions(apiURL, configId, token)

			console.log('options to set', optionsToSetRes.data)
			if (optionsToSetRes.data && optionsToSetRes.data.data) {

				const optionIds = optionsToSetRes.data.data.map(option => option.id)
				let continues = true

				optionIds.forEach( async optionId => {

					const buildRes = await checkBuild(apiURL, configId, token)
					console.log('config id passes ? ',buildRes.data)
					if (!buildRes || !buildRes.data.buildable) {
						await addOption(apiURL, configId, optionId, token)
					}
				})
			}
		}))

		await Promise.all(missingModels.map( async model => {

			const configId = newEntries[model.id].configId
			const imagesRes = await getImages(apiURL, configId, token)
			const imageLinks = imagesRes.data

			console.log(imageRes)

			newEntries[model.id].images = imageLinks.data
		}))

		Object.keys(newEntries).forEach(key => {

			db.get('DefaultConfigs')
				.push(newEntries[key])
				.assign({ id : newEntries[key].id })
				.write()
		})

		const modelData = Object.assign({}, newEntries, cachedModels)

		sendJSON(res, modelData)

	} catch (err) {

		// console.log(err)
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