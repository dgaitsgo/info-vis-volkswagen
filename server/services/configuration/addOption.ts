export {}

const Okapi = require('../Okapi')
const sendJSON = require('../../helpers/sendJSON')
const app = require('../app/app')

app.get('/api/addOption', async (req, res, next) => {

    const { configId, optionId, token } = req.query

    try {

        const nextOptionsRes = await Okapi.addOption(configId, optionId, token)
        
        if (nextOptionsRes.data) {
            sendJSON(res, { options : nextOptionsRes.data.data })
        }
    
	throw ('Could not add option')

    }  catch (e) {

        next(new Error(e))

   }
})
