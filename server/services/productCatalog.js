const axios = require('axios')
const app = require('./app')
const sendJSON = require('../helpers/sendJSON')

const apiURL = 'https://api.productdata.vwgroup.com/v2'

const defaultHeaders = access_token => ({
	headers: {
		'Authorization': 'bearer ' + access_token,
		'Accept' : 'application/json',
		'Cache-Control' : 'max-age : 3600000'
	}
})

const apiSchema = {
	'countries' : [],
	'brands' : ['countryCode'],
	'models' : ['countryCode', 'brand_id'],
    'brandTypes' : ['countryCode', 'brand_id'],
    'modelTypes' : ['countryCode', 'model_id'],
	'typeOptions' : ['countryCode', 'type_id'],
}

const apiEndpoints = {
	'countries' : () => `${apiURL}/countries`,
	'brands' : (country_code) => `${apiURL}/catalog/${country_code}/brands`,
	'models' : (country_code, brand_id) => `${apiURL}/catalog/${country_code}/brands/${brand_id}/models`,
	'brandTypes' : (country_code, brand_id) => `${apiURL}/catalog/${country_code}/models/${brand_id}/types`,
	'modelTypes' : (country_code, model_id) => `${apiURL}/catalog/${country_code}/models/${model_id}/types`,
	'typeOptions' : (country_code, type_id) => `${apiURL}/catalog/${country_code}/types/${type_id}/options`
}

Object.keys(apiSchema).forEach(key => {

    app.get(`/api/${key}`, (req, res) => {

        const _args = apiSchema[key].map(paramKey => req.query[paramKey])

        reqProductData(
            req,
            res,
            apiEndpoints[key].apply(null, _args),
            key
        )
    })
})

const reqProductData = async (req, res, url, key) => {

	const _token = req.query.token
	console.log('token in countries', _token)
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token

	try {

		const apiRes = await axios.get(url, defaultHeaders(token.access_token))
		const data = apiRes.data

		sendJSON(res, { token, [key] : data })

	} catch (err) {

		const { status, statusText } = err.response

		console.error(status, statusText)

		res.status(status).send({
			error : true,
			message: statusText,
			userMessage : `Could not get ${key}`
		})
	}
}
