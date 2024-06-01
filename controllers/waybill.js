const express = require('express')
const passport = require('../config/auth')
const router = express.Router()
const Location = require('../models/Location')
const User = require('../models/User')

router.get('/', async (req, res) => {
    const locations = await Location.find() 
    if(!locations) res.status(200).json({ message: 'No Locations'})
    res.status(200).json(locations)
})

router.post('/new', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { state, city, address, phone, email, price } = req.body
        await Location.create({
            shipper: req.user._id,
            company: req.user.shipper.name,
            state,
            city,
            address,
            phone,
            email,
            price
        })
        res.status(200).json({ message: 'Successful' })
    } catch (error) {
        console.log(error.message)
    }
})

router.get('/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const locations = await Location.find({ shipper: req.user._id })

    if (!locations) {
        res.status(200).json({ message: 'No locations' })
    }

    res.status(200).json(locations)
})

module.exports = router