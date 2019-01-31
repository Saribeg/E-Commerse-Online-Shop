const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.get("/test", (req, res) => {
  res.json({ msg: "Users Works" });
});

// Add user to mongodb after server-side validations
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors); //If not valid - send information about errors to client-side (React)
  }

  // Check if the user already exist
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      // If not exist - create user object according to mongoose schema
      const newUser = new User({
        fullName: req.body.fullName,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
      });

      // Here you can crypt password before adding user to db

      // Add new user to mongodb
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

// Login
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body); //If not valid - send information about errors to client-side (React)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email in mongodb
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //Here must be an authorisation logic, compare password and so on
  });
});

module.exports = router;
