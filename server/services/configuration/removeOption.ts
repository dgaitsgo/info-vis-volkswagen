export {}

const Okapi = require('../Okapi')
const apiURL = require('../../constants/apiURL')
const sendJSON = require('../../helpers/sendJSON')
const express = require('express')
const app = require('../app/app')

app.get('/api/removeOption', async (req, res, next) => {

    const { token, configId, optionId } = req.query
    
    try {
        
        const optionsRes = Okapi.removeOption(configId, optionId, token)
        const options = optionsRes.data.data 
        
        sendJSON(res, { options })

    } catch (e) {

        next(new Error(e))
    }
})