const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017/defaultConfigs'

MongoClient.connect(mongoURL, (err, db) => {

    if (err)
        throw err

    db.close()
})
