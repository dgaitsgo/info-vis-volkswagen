/******************************************************************************
 * Dependencies 
 *****************************************************************************/
const express = require('express')
const axios = require('axios')
const addSeconds = require('date-fns/add_seconds')

/******************************************************************************
 * Modules
 *****************************************************************************/
// const sendJSON = require('./helpers/sendJSON')

/******************************************************************************
 * Config 
 *****************************************************************************/
// const app = require('./services/app/app')
import app from './services/app/app'
/******************************************************************************
 * Services 
 *****************************************************************************/
const db = require('./services/db')
const identity = require('./services/identity')
// const defaultModels = require('./services/defaultModels')
const productCatalog = require('./services/productCatalog')
const configureCar = require('./services/configuration')
// const allUniqueModels = require('./services/allUniqueModels')
const errorHandler = require('./services/app/errorHandler')

console.log(app.listen)
/******************************************************************************
 * Server 
 *****************************************************************************/
const port = process.env.PORT

app.listen(port, () => console.log(`Server started on ${ port }`))
