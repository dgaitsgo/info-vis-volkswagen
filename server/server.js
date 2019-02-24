/******************************************************************************
 * DEPENDENCIES
 *****************************************************************************/
const express = require('express')
const axios = require('axios')
const addSeconds = require('date-fns/add_seconds')
const sendJSON = require('./helpers/sendJSON')

/******************************************************************************
 * CONFIG
 *****************************************************************************/
const app = require('./services/app')

/******************************************************************************
 * SERVICES
 *****************************************************************************/
const refreshToken = require('./services/refreshToken')
const productCatalog = require('./services/productCatalog')

const apiURL = 'https://api.productdata.vwgroup.com/v2'

const defaultHeaders = access_token => ({
	headers: {
		'Authorization': 'bearer ' + access_token,
		'Accept' : 'application/json'
	}
})

app.get('/api/configurations', async (req, res) => {

	const _token = req.query.token
	const token = typeof(_token) === 'string' ? JSON.parse(_token) : _token
	const { model_id } = req.query

	console.log(model_id)

	try {
		
		const url = `${apiURL}/configurations`

		const configRes = await axios({
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

		const { data } = configRes

		sendJSON(res, { token, configuration : data })

	} catch (err) {

		const { status, statusText } = err.response

		console.error(status, statusText)

		res.status(status).send({
			error : true,
			message: statusText,
			userMessage : `Could not get ${key}`
		})
	}
})

/******************************************************************************
 * RUN 
 *****************************************************************************/
const port = process.env.PORT
app.listen(port, () => console.log(`Server started on ${port}`))
