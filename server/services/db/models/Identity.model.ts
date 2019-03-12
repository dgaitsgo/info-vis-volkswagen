import mongoose from 'mongoose'
const Schema = mongoose.Schema

const IdentitySchema = new Schema(
    {
        access_token : { type : String, require : true },
        createdAt : { type : Date, require : true },
        expirationDate : { type : Date, require : true }
    },
    {
        versionKey : false 
    }
)

export default mongoose.model('IdentitySchema', IdentitySchema)