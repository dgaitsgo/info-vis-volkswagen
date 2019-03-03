const mongoose = require('mongoose')

const mongoDB = 'mongodb://mongo:27017/vw-okapi'

mongoose.connect(mongoDB, { useNewUrlParser : true })
    .then( () => {
        console.log('Connected to mongodb')
    })
    .catch( () => {
        console.log(err)
    })

const db = mongoose.connection

//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error : '))

module.exports = db
