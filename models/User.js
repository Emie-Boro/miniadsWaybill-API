const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'private','business'],
        default: 'business'
    },
    shipper: {
        name: {
            type:String,
            required:true,
        },
        office: {
            type:String,
            required:true
        },
        phone: String,
        verified: {
            type: String,
            enum: ['true', 'false', 'pending'],
            default: 'pending'
        }
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User