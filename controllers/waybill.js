const express = require('express')
const passport = require('../config/auth')
const router = express.Router()
const Location = require('../models/Location')
const User = require('../models/User')

router.get('/', async (req, res) => {
    const locations = await Location.find()
    if(locations) {
        res.status(200).json(locations)
    } else {
        res.status(200).json({ message: 'No location yet'})
    }

})

router.post('/new', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { state, city, address, phone, email, price } = req.body
        const location = await Location.create({
            shipper: req.user._id,
            company: req.user.shipper.name,
            state,
            city,
            address,
            phone,
            email,
            price
        })

        if (location) {
            res.status(200).json({ message: 'Successful' })
        }
    } catch (error) {
        console.log(error.message)
    }
})

router.get('/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const locations = await Location.find({ shipper: req.user._id })

    if (locations) {
        res.status(200).json(locations)
    } else {
        res.status(200).json({ message: 'No locations' })
    }
})

module.exports = router