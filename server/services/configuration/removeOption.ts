import app from '../app/app'
import sendJSON from '../../helpers/sendJSON'
import Okapi from '../Okapi'

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