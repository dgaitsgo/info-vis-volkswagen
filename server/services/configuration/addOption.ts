import app from '../app/app'
import Okapi from '../Okapi'
import sendJSON from '../../helpers/sendJSON'

app.get('/api/addOption', async (req, res, next) => {

    const { configId, optionId, token } = req.query
    
    try {

        const nextOptionsRes = Okapi.addOption(configId, optionId, token)
        sendJSON(res, { options : nextOptionsRes.data.data })
    
    }  catch (e) {

        next(new Error(e))
	}
})

