const axios = require('axios')
const addSeconds = require('date-fns/add_seconds')
const app = require('./app')
const apiURL = 'https://api.productdata.vwgroup.com/v2'

let globalToken = null

const refreshAccessToken = () => {

	const baseUrl = 'https://identity.vwgroup.io/oidc/v1/token'
	const client_id = process.env.CLIENT_ID
	const client_secret = process.env.CLIENT_SECRET
	const requestURL = `${baseUrl}?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`

	return (requestURL)
}

//middleware to refresh token and get one on initial load
app.use( async (req, res, next) => {

	const token = globalToken
	const now = new Date()
	const nowString = now.toISOString()

	if (!token || nowString > token.expirationDate) {

		try {

			const requestURL = refreshAccessToken()
			const nextTokenRes = await axios.post(requestURL, {
				headers : {
					"Cache-Control" : "no-cache",
					"Content-Type": "application/x-www-form-urlencoded",
				}
			})

			let nextToken = nextTokenRes.data

			nextToken.expirationDate = addSeconds(nowString, nextToken.expires_in).toISOString()
			globalToken = nextToken

		} catch(err) {

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