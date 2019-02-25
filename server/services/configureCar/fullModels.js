
const axios = require('axios')
const app = require('../app')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')

/*
	Target data set: for each model a default config
	
	configsMap = {
		model_id : config_id
	}
*/
let configsMap = {}

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
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const models = JSON.parse(req.query.models)
	
	try {

		const configsURL = `${apiURL}/configurations`
		const missingModels = models.filter( model => !configsMap[model.id]  )
		
		console.log(`missing models : ${missingModels}`)

		// for all the missing models
		const configIds = await Promise.all(missingModels.map(async model => {	
		
			// make a new configuration
			const newConfigRes = await makeConfiguration(configsURL, model.id, token)
			const configId = newConfigRes.data.id

			console.log('our config ID:', configId)
			
			// get ids of the new configurations
			configsMap[model.id] = configId 
				
			return configId
		}))

		console.log(`config ids : ${configIds}`)

		//for all the new configs
		await Promise.all(configIds.map( async configId => {

			//get all of the options to complete the build
			const optionsToSetRes = await resolveOptions(apiURL, configId, token)
	
			if (optionsToSetRes.data && optionsToSetRes.data.data) {
				console.log('options to set', optionsToSetRes.data.data)
				// console.log('options to set', typeof(optionsToSetRes.data))
				const optionIds = optionsToSetRes.data.data.map(option => option.id)

				console.log(`option ids : ${optionIds}`)

				let continues = true
				optionIds.forEach( async optionId => {

					const buildRes = await checkBuild(apiURL, configId, token)

					console.log('what is build res', buildRes.data)

					if (!buildRes || !buildRes.data.buildable) {
						await addOption(apiURL, configId, optionId, token)
					}
				})
			}
		}))

		const allConfigIds = models.map(model => configsMap[model.id])

		console.log(allConfigIds)

		const imagesRes = await Promise.all(allConfigIds.map( id => getImages(apiURL, id, token)))

		const imageLinks = imagesRes.map(res => res.data)
		
		console.log('image links', imageLinks)

		sendJSON(res, imageLinks)
		
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