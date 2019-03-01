const mongoose = require('mongoose')

const mongoDB = 'mongodb://127.0.0.1/vw-okapi'

mongoose.connect(mongoDB, { useNewUrlParser : true })

const db = mongoose.connection

//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error : '))

module.exports = db