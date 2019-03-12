const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DefaultModelSchema = new Schema(
    {
        model_id : { type : String, require : true },
        name : { type : String, require : true },
        wltp : { type : Object, require : true },
        defaultOptions : { type : Array, require : true },
    },
    {
        versionKey : false 
    }
)

module.exports = mongoose.model('DefaultModelSchema', DefaultModelSchema)

// thumbnail: { type : String, require : false },
// brand_id : { type : String, require : true },
// country_code : { type : String, require : true },
// createdAt : { type : Date, require : true },
// expirationDate : { type : Date, require : true }