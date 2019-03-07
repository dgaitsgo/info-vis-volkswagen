const axios = require('axios')
const addSeconds = require('date-fns/add_seconds')
const isAfter = require('date-fns/is_after')
const app = require('./app')
const baseUrl = 'https://identity.vwgroup.io/oidc/v1/token'
const Identity = require('./db/models/Identity.model')

const refreshAccessToken = () =>
	axios({
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

    //find latest token
    let token = await Identity.findOne().sort({ createdAt : -1 })

	if (!token || !token.access_token || isAfter(now, token.expirationDate)) {

		try {
	
            const nextTokenRes = await refreshAccessToken()
            const nextToken = nextTokenRes.data 
			
            token = await new Identity ({
				access_token : nextToken.access_token,				
                expirationDate : addSeconds(now, nextToken.expires_in),
                createdAt : now 
            }).save()

			req.query.token = token

			next()

		} catch(err) {

			const { status, statusText } = err.response

			console.log(status, statusText)

			return (res.status(status).send({
				error : true,
				message: statusText,
				userMessage : 'Could not get access'
			}))
		}
	} else {
		req.query.token = token
		next()
	}
})
