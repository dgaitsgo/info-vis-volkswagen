const axios = require('axios')
const addSeconds = require('date-fns/add_seconds')
const app = require('./app')
const baseUrl = 'https://identity.vwgroup.io/oidc/v1/token'
let globalToken = null

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

	globalToken  = globalToken || req.query.token
	const now = new Date()
	const nowString = now.toISOString()

	if (!globalToken || nowString > globalToken.expirationDate) {

		try {

			const nextTokenRes = await refreshAccessToken()
			let nextToken = nextTokenRes.data

			nextToken.expirationDate = addSeconds(nowString, nextToken.expires_in).toISOString()
			globalToken = nextToken

		} catch(err) {

			console.error(err)

			const { status, statusText } = err.response

			return (res.status(status).send({
				error : true,
				message: statusText,
				userMessage : 'Could not get access'
			}))
		}
	}

	req.query.token = globalToken

	next()
})