
import app from '../app/app'
import axios from 'axios'
import apiURL from '../../constants/apiURL'
import sendJSON from '../../helpers/sendJSON'
import Okapi from '../Okapi'

app.get('/api/checkBuild', async (req, res, next) => {

	const { configId, token } = req.query

	try {
        
        const buildRes = await Okapi.checkBuild(configId, token)
		const { data } = buildRes 

		sendJSON(res, { build : data })

	} catch (err) {
		
		next(new Error(err))
	}
})