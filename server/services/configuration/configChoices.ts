import Okapi from '../Okapi'
import app from '../app/app'
import apiURL from '../../constants/apiURL'
import sendJSON from '../../helpers/sendJSON'

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