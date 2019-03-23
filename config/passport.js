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

            return User.findOne({email: email, activeAccoont: true}, function (err, user) {

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

        }
    ));

    passport.use(

        new JwtStrategy(options, (jwt_payload, done) => {
            User.findById(jwt_payload._doc)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );


};