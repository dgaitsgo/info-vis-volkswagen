
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

app.get('/api/configureModels', async(req, res) => {

	const _token = req.query.token
	const modelsParam = req.query.models
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const _models = typeof(modelsParam) === 'string' ? JSON.parse(modelsParam) : modelsParam
	const models = _models.map(model => typeof(model) === 'string' ? JSON.parse(model) : model)

	try {

		const configsURL = `${apiURL}/configurations`

		// for all the missing models
		const configIds = await Promise.all(models.map(async model => {

			// make a new configuration
			const newConfigRes = await makeConfiguration(configsURL, model.id, token)
			const configId = newConfigRes.data.id

			return configId
		}))

		//for all the new configs
		await Promise.all(configIds.map( async configId => {

			//get all of the options to complete the build
			const optionsToSetRes = await resolveOptions(apiURL, configId, token)
			const optionIds = optionsToSetRes.data.data.map(option => ({ id : option.id }))
			
			// console.log('replacingOptions', optionIds, 'in', configId)

			await replaceOptions({ configId, optionIds, token })
			
		}))

		const defaultOptions = await Promise.all(configIds.map(configId => getOptions({ configId, token })))
		const wltps = await Promise.all(configIds.map(configId => getWLTP({ configId, token })))

		let configOptionsMap = {}

		models.forEach( (model, i) => {
			
			configOptionsMap[model.id] = {}
			configOptionsMap[model.id].model = model
			configOptionsMap[model.id].defaultOptions = defaultOptions[i].data
			configOptionsMap[model.id].wltp = wltps[i].data
			configOptionsMap[model.id].configId = configIds[i]

		})

		// console.log(configOptionsMap)

		// const buildRes = await checkBuild(apiURL, configIds[0], token)
		sendJSON(res, configOptionsMap)

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