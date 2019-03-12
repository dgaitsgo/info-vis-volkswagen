import axios from 'axios'
import app from './app/app'
import sendJSON from '../helpers/sendJSON'

const apiURL = 'https://api.productdata.vwgroup.com/v2'

const defaultHeaders = (access_token : string) => ({
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
	'brands' : (country_code : string) => `${apiURL}/catalog/${country_code}/brands`,
	'models' : (country_code : string, brand_id : string) => `${apiURL}/catalog/${country_code}/brands/${brand_id}/models`,
	'brandTypes' : (country_code : string, brand_id : string) => `${apiURL}/catalog/${country_code}/models/${brand_id}/types`,
	'modelTypes' : (country_code : string, model_id : string) => `${apiURL}/catalog/${country_code}/models/${model_id}/types`,
	'typeOptions' : (country_code : string, type_id : string) => `${apiURL}/catalog/${country_code}/types/${type_id}/options`
}

Object.keys(apiSchema).forEach(key => {

    app.get(`/api/${key}`, (req, res, next) => {

        const _args = apiSchema[key].map(( paramKey : string ) => req.query[paramKey])

        reqProductData(
            req,
			res,
			next,
            apiEndpoints[key].apply(null, _args),
            key
        )
    })
})

const reqProductData = async (req, res, next, url, key) => {

	const { token } = req.query

	try {

		const apiRes = await axios.get(url, defaultHeaders(token.access_token))
		const data = apiRes.data

		sendJSON(res, { token, [key] : data })

	} catch (e) {
		
		next(new Error(e))
	}
}
