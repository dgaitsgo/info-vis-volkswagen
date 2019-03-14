export {}

const Okapi = require('../Okapi')
const sendJSON = require('../../helpers/sendJSON')
const express = require('express')
const app = require('../app/app')

app.get('/api/addOption', async (req, res, next) => {

    const { configId, optionId, token } = req.query

    console.log('wo so much options', configId, optionId)

    try {

        const nextOptionsRes = await Okapi.addOption(configId, optionId, token)
        
        console.log('next option res', nextOptionsRes.status)
        if (nextOptionsRes.data) {
            console.log('next option data', nextOptionsRes.data)
            sendJSON(res, { options : nextOptionsRes.data.data })
        }
    
    }  catch (e) {

        next(new Error(e))
	}
})