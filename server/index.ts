export {}

/******************************************************************************
* Dependencies 
*****************************************************************************/
const axios = require('axios')
const addSeconds = require('date-fns/add_seconds')
/******************************************************************************
* Services 
******************************************************************************/
const app = require('./services/app/app')
const db = require('./services/db')
/******************************************************************************
* Endpoints 
******************************************************************************/
const identity = require('./services/identity')
const productCatalog = require('./services/productCatalog')
const configuration = require('./services/configuration')
const errorHandler = require('./services/app/errorHandler')
/******************************************************************************
* Server 
******************************************************************************/
const port = process.env.PORT || 6000  
app.get('/', (req, res) => res.send('Hello world'))
app.listen(port, () => console.log(`Server started on ${ port }`))
