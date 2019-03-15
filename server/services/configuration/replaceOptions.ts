export {}

const Okapi = require('../Okapi')
const sendJSON = require('../../helpers/sendJSON')
const app = require('../app/app')

app.get('/api/replaceOptions', async (req, res, next) => {

    const { configId, optionIds, token } = req.query
    
    const optionIdsObj = optionIds.map(option => JSON.parse(option)) 

    console.log('replacing options', configId, optionIdsObj)

    try {

        const nextOptionsRes = await Okapi.replaceOptions(configId, optionIdsObj, token)
  
        console.log('next option res', nextOptionsRes.status)
        if (nextOptionsRes.data) {
            console.log('next option data', nextOptionsRes.data)
            sendJSON(res, { options : nextOptionsRes.data.data })
        }
    
	throw ('Could not replace options')

    }  catch (e) {

        next(new Error(e))

   }
})
