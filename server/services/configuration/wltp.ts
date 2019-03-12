export {}

const Okapi = require('../Okapi')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')
const express = require('express')
const app = require('../app/app')

app.get('/api/wltp', async (req, res, next) => {

	const { configId, token } = req.query

	try {
        
        const wltpRes = await Okapi.getWLTP(configId, token)
		const { data } = wltpRes 

		sendJSON(res, { wltp : data })

	} catch (err) {
		
		next(new Error(err))
	}
})