export {}

const axios = require('axios')
const addSeconds = require('date-fns/add_seconds')
const isAfter = require('date-fns/is_after')
const express = require('express')
const app = require('../services/app/app')
const baseUrl = 'https://identity.vwgroup.io/oidc/v1/token'
const Identity = require('./db/models/Identity.model')

interface Identity {
	expirationDate : string
	access_token : any
	findOne : any
}

const refreshAccessToken = () =>
	axios ({
		method: 'post',
		url: baseUrl,
		headers: {
			'Cache-Control' : 'no-cache',
			'Content-Type' : 'application/x-www-form-urlencoded'
		},
		params : {
			grant_type : 'client_credentials',
			client_id : process.env.CLIENT_ID,
			client_secret : process.env.CLIENT_SECRET
		}
	})

//middleware to refresh token and get one on initial load
app.use( async (req, res, next) => {

	const now = new Date()

	console.log(Identity.findOne)

    //find latest token
    let token = await Identity.findOne().sort({ createdAt : -1 }) as unknown as Identity

	if (!token || !token.access_token || isAfter(now, token.expirationDate)) {

		try {
	
            const nextTokenRes = await refreshAccessToken()
            const nextToken = nextTokenRes.data 
			
            token = await new Identity ({
				access_token : nextToken.access_token,				
                expirationDate : addSeconds(now, nextToken.expires_in),
                createdAt : now 
            }).save() as unknown as Identity

			req.query.token = token

			next()

		} catch(err) {

			next(new Error(err))
		}
	} else {
		req.query.token = token
		next()
	}
})