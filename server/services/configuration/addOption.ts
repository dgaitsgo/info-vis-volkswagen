export {}

const Okapi = require('../Okapi')
const sendJSON = require('../../helpers/sendJSON')
const express = require('express')
const app = require('../app/app')

app.get('/api/addOption', async (req, res, next) => {

    const { configId, optionId, token } = req.query
    
    try {

        const nextOptionsRes = Okapi.addOption(configId, optionId, token)
        sendJSON(res, { options : nextOptionsRes.data.data })
    
    }  catch (e) {

        next(new Error(e))
	}
})