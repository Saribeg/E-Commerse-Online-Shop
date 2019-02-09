const express = require("express");
const router = express.Router();
const User = require("../models/User");

// const bcrypt = require('bcryptjs');
// const SALT_WORK_FACTOR = 10;

// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.get("/test", (req, res) => {
  res.json({ msg: "Users Works" });
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
  User.findOne({ email: req.body.email }).then(user => {
    console.log("hi");
    if (user) {
      // if user allready exist then deny request from front
      res.json({ result: false });
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
  User.findOne({ email: email }, function(err, user) {
    console.log(user);

    // if any mistakes of user was not found - send to FRONT object with status FALSE
    // If front get FALSE - then add field "incorrect login or password"
    if (err || !user) {
      res.json({ result: false });
    } else {
      // if we get exist email then check password with bcrypt
      user.comparePassword(password, function(err, isMatch) {
        if (!isMatch) {
          res.json({ result: false });
        } else {
          // if all good - send object with data about user
          res.json(user);
        }
      });
    }
  });
});

module.exports = router;
