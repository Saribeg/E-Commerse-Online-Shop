const express = require("express");
const router = express.Router();
const User = require("../models/User");

const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.get("/test", (req, res) => {
    res.json({msg: "Users Works"});
});

// Add user to mongodb after server-side validations
router.post("/register", (req, res) => {
    // const {errors, isValid} = validateRegisterInput(req.body);

    // Check validation
    // if (!isValid) {
    //
    //     console.log('hi errors');
    //     return res.status(400).json(errors); //If not valid - send information about errors to client-side (React)
    // }

    // Check if the user already exist
    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            // if user allready exist then deny request from front
            res.json({result: false});
        } else {
            // If not exist - create user object according to mongoose schema
            const newUser = new User({
                firstName: req.body.firstName,
                secondName: req.body.secondName,
                email: req.body.email,
                password: req.body.password
            });

            newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        }
    });
});

//Send post-request from Login form
router.post("/login", (req, res) => {
    // const {errors, isValid} = validateLoginInput(req.body); //If not valid - send information about errors to client-side (React)

    // Check validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    // get elements from body of form
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email in mongoose
    User.findOne({email: email}, function (err, user) {

        // if any mistakes of user was not found - send to FRONT object with status FALSE
        // If front get FALSE - then add field "incorrect login or password"
        if (err || !user) {
            res.json({success: false});
        } else {
            // if we get exist email then check password with bcrypt
            user.comparePassword(password, function (err, isMatch) {
                if (!isMatch) {
                    res.json({success: false});
                } else {
                    // console.log(user);
                    let payload = {...user};

                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 3600000 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        }
                    );


                    // if all good - send object with data about user
                    // res.json(user);
                }
            });
        }
    });
});


router.post("/update-profile/personal-info", (req, res) => {

    console.log('update BACK')

    // const {errors, isValid} = validateRegisterInput(req.body);

    // Check validation
    // if (!isValid) {
    //
    //     console.log('hi errors');
    //     return res.status(400).json(errors); //If not valid - send information about errors to client-side (React)
    // }

    // Check if the email already exist
    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            // Email can be exist but its owner is current user
            if (req.body.id != user._id) {
                res.json({status: 'exist-email', data: {}});
            }

        } else {

            // updating only three fields in the object in database
            User.update({_id: req.body.id}, {
                $set: {
                    firstName: req.body.firstName,
                    secondName: req.body.secondName,
                    email: req.body.email,
                }
            })
                .then(() => {

                        //we will send updated user to FRONT after updating
                        User.findOne({_id: req.body.id})
                            .then(user => {
                                res.json({status: 'success', userinfo: user})
                            })
                    }
                )
                .catch(err => console.log(err));

        }
    });
});


router.post("/update-profile/password", (req, res) => {

    // const {errors, isValid} = validateRegisterInput(req.body);

    // Check validation
    // if (!isValid) {
    //
    //     console.log('hi errors');
    //     return res.status(400).json(errors); //If not valid - send information about errors to client-side (React)
    // }


    // find our user by ID
    User.findOne({_id: req.body.id}, function (err, user) {

        let oldPassword = req.body.password;
        // we get info from database by id and compare passwords ()
        user.comparePassword(oldPassword, function (err, isMatch) {
            if (!isMatch) {
                // is password in database and password from the field "Current password aren't matched"
                res.json({status: 'incorrect-password', data: {}});
            } else {

                // is password in database and password from the field "Current password are matched"
                let newPass = req.body.newPassword;

                //use bcrypt
                bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                    if (err) return next(err);
                    // hash the password along with our new salt
                    bcrypt.hash(newPass, salt, function(err, hash) {
                        if (err) return next(err);
                        newPass = hash;
                        //find user by ID ant set new crypted password
                        User.update({_id: req.body.id}, {
                            $set: {
                                password: newPass,
                            }
                        })
                            .then(() => {
                                res.json({status: 'success', data: {}});
                            })

                    });
                });

            }
        });

    });


});


module.exports = router;
