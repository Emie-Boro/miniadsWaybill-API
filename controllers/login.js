const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('../config/auth')

router.post('/', (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            if (!user) {
                return res.status(400).json({ message: 'Email or Password is incorrect' });
            }

            req.login(user, { session: false }, async (error) => {
                if (error) {
                    return next(error);
                }

                const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json({ token });
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    })(req, res, next);
});


module.exports = router