const axios = require('axios')
const Cache = require('../../services/cache)
//const API_URLS = require('../../constat
const ttl = 60 * 60
const cache = new Cache(ttl)

const API_URLS = {
	product_data : 'https://api.productdata.vwgroup.com/v2'
}

const CountryModel = {

	getCountries(token) {
	
		const url = `${api_url.product_data}/countrires`

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
	

			reqProductData(
				req,
				res,
				apiEndpoints[key].apply(null, _args),
				key
			)
		})
	}

}

//module.exports 
