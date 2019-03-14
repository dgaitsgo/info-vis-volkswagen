export {}

const Okapi = require('../Okapi')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')
const express = require('express')
const app = require('../app/app')

app.get('/api/configChoices', async(req, res, next) => {

	const { configId, token } = req.query

	try {

		const choicesRes = await Okapi.configChoices(configId, token)
		const { data } = choicesRes

        sendJSON(res, { choices : data.data })
        
    } catch (err) {

        next(new Error(err))
    }    
})