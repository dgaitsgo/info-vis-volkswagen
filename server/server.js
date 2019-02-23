const express = require('express')
const app = express()
const axios = require('axios')
const addSeconds = require('date-fns/add_seconds')
const port = process.env.PORT

/*
	Api Rooms For improvement :
	- Access token could include expiration date rather than relative 'expires_in'
	- Models do not have categories : Most users even if they do not know which brand they want to purchase,
	  know by which category
*/

const sendJSON = (res, content) => {

	res.setHeader('Content-Type', 'application/json')
	res.send(JSON.stringify(content))
}

const refreshAccessToken = () => {
	
	const baseUrl = 'https://identity.vwgroup.io/oidc/v1/token'
	const client_id = process.env.CLIENT_ID
	const client_secret = process.env.CLIENT_SECRET
	const requestURL = `${baseUrl}?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`

	return (axios.post(requestURL))
}

//Token refresher middleware
app.use( async (req, res, next) => {

	const { token } = req.query
	const now = new Date()
	const nowString = now.toISOString()

	if (!token || nowString > token.expirationDate) {
	
		try {

			const nextTokenRes = await refreshAccessToken()
			let nextToken = nextTokenRes.data

			nextToken.expirationDate = addSeconds(nowString, nextToken.expires_in).toISOString()
			req.query.token = nextToken

		} catch(err) {
			console.log(err)	
		}
	}

	next()
})

app.get('/api/countries', async(req, res) => {

	const { token } = req.query

	axios.get('https://api.productdata.vwgroup.com/v2/countries',
		{
			headers: {
				'Authorization': 'bearer ' + token.access_token,
				'Accept' : 'application/json'
			}
		})
		.then(countriesRes => {
			
			const countries = countriesRes.data
			
			sendJSON(res, { token, countries })
		})
		.catch(err => {
			console.log('Error in countries : ', err)
		})
})

//app.get('/brands', async(req, res) => {
//
//	const { token } = req.query
//
//	axios.get()
//
//})

app.listen(port, () => console.log(`Server started on ${port}`))
