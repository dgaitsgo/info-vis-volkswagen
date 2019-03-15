export {}

const Okapi = require('../Okapi')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')
const express = require('express')
const app = require('../app/app')

app.get('/api/images', async (req, res, next) => {

	const { configId, token } = req.query

	try {

	        const imagesRes = await Okapi.getImages(configId, token)
		const { data } = imagesRes

		sendJSON(res, { images : data })

	} catch (err) {
		
		next(new Error(err))
	}
})
