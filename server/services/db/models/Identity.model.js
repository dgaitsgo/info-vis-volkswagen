const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IdentitySchema = new Schema(
    {
        token : { type : String, require : true },
        createdAt : { type : Date, require : true },
        expirationDate : { type : Date, require : true }
    },
    {
        versionKey : false 
    }
)

module.exports = mongoose.model('IdentitySchema', IdentitySchema)