let mongoose = require('mongoose')
let Schema = mongoose.Schema

let ModelSchema = new Schema(
	{
		countryCode : { type : String, required : true },
		brandId : { type : String, required : true },

