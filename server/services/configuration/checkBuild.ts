export {}

const sendJSON = require('../../helpers/sendJSON')
const Okapi = require('../Okapi')
const express = require('express')
const app = require('../app/app')

app.get('/api/checkBuild', async (req, res, next) => {

	const { configId, token } = req.query

	try {
        
        const buildRes = await Okapi.checkBuild(configId, token)
		const { data } = buildRes 

		sendJSON(res, { build : data })

	} catch (err) {
		
		next(new Error(err))
	}
})