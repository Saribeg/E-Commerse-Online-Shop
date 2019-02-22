const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, cb) {

        console.log('local strategy')

            return User.findOne({email: email}, function (err, user) {

                if (err || !user) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                } else {
                    // if we get exist email then check password with bcrypt
                    user.comparePassword(password, function (err, isMatch) {
                        if (!isMatch) {
                            return cb(null, false, {message: 'Incorrect email or password.'});
                        } else {
                            return cb(null, user, {
                                message: 'Logged In Successfully'
                            });
                        }
                    });
                }
            });

            // return UserModel.findOne({email, password})
            //     .then(user => {
            //         if (!user) {
            //             return cb(null, false, {message: 'Incorrect email or password.'});
            //         }
            //
            //         return cb(null, user, {
            //             message: 'Logged In Successfully'
            //         });
            //     })
            //     .catch(err => {
            //         return cb(err);
            //     });
        }
    ));



    passport.use(

        new JwtStrategy(options, (jwt_payload, done) => {

            // console.log('jwt strategy')

            // console.log(jwt_payload._doc._id)

            User.findById(jwt_payload._doc)
                .then(user => {

                    // console.log(user)

                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );


};