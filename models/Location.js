const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new Schema({
    shipper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    company: String,
    state: {
        type:String,
        required: true,
    },
    city: {
        type:String,
        required: true,
    },
    address: {
        type:String,
        required: true,
    },
    phone: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true
    },
    price:{
        type:String,
        required: true
    },
    verified: {
        type: String,
        enum: ['true','false','pending'],
        default: 'pending'
    }
})

const Location = mongoose.model('Location', locationSchema)

module.exports = Location