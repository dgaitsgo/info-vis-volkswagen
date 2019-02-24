/************************************************
 * DEPENDENCIES
 ************************************************/
const express = require('express')
const axios = require('axios')
const addSeconds = require('date-fns/add_seconds')

/************************************************
 * CONFIG
 ************************************************/
const app = require('./services/app')

/************************************************
 * SERVICES
 ************************************************/
const refreshToken = require('./services/refreshToken')
const productCatalog = require('./services/productCatalog')

/************************************************
 * RUN 
 ************************************************/
const port = process.env.PORT
app.listen(port, () => console.log(`Server started on ${port}`))
