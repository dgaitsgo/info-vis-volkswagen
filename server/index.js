/******************************************************************************
 * Dependencies 
 *****************************************************************************/
const express = require('express')
const axios = require('axios')
const addSeconds = require('date-fns/add_seconds')

/******************************************************************************
 * Modules
 *****************************************************************************/
const sendJSON = require('./helpers/sendJSON')

/******************************************************************************
 * Config 
 *****************************************************************************/
const app = require('./services/app')
/******************************************************************************
 * Services 
 *****************************************************************************/
const db = require('./services/db')
const identity = require('./services/identity')
const refreshToken = require('./services/refreshToken')
const productCatalog = require('./services/productCatalog')
const configureCar = require('./services/configureCar')
const allUniqueModels = require('./services/allUniqueModels')

/******************************************************************************
 * Server 
 *****************************************************************************/
const port = process.env.PORT
console.log('desapsisroi')
app.listen(port, () => console.log(`Server started on ${port}`))
