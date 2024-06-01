const express = require('express')
const router = express.Router()
const passport = require('../config/auth')

router.post('/', passport.authenticate('signup', { session: false }),  async (req, res, next) =>{
    res.status(200).json({message: 'Signup Successful'})
})

module.exports = router