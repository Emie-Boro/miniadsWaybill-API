const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


require('dotenv').config()

passport.use(
    new JWTstrategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                console.log(error);
                return done(error);
            }
        })
);

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const { role, username, shipper } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            email,
            password: hashedPassword,
            username,
            role,
            shipper
        });

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }

        const validate = await bcrypt.compare(password, user.password);

        if (!validate) {
            return done(null, false, { message: 'Password Incorrect' });
        }
        return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
        console.log(error.message);
        return done(error);
    }
}));

module.exports = passport;
