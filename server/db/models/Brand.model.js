let mongoose = require('mongoose')
let Schema = mongoose.Schema

let BrandSchema = new Schema(
	{
		id : { type : String, require : true },
		name : { type : String, require : true }
		countryCode : { type : String, require : true },
	},
	{
		versionKey : false
	}
)

module.exports = mongoose.model('BrandSchema', BrandSchema)
