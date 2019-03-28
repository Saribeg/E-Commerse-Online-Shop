const express = require("express");
const router = express.Router();
const User = require("../models/User");

const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

const readHTMLFile = function(path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function(err, html) {
    if (err) {
      throw err;
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.get("/test", (req, res) => {
  res.json({ msg: "Users Works" });
});

router.post("/verify", (req, res) => {
  console.log("req.body.id", req.body.id);

  User.findOne({ confirmLoginToken: req.body.id })
    .then(user => {
      console.log("user", user);
      if (user) {
        User.update(
          { confirmLoginToken: req.body.id },
          {
            $set: {
              activeAccoont: true
            }
          }
        )
          .then(() => {
            res.json({ success: true });
          })
          .catch(() => {});
      } else {
        res.json({ success: false });
      }
    })
    .catch(err => console.log(err));
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

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2019.matter.store@gmail.com",
      pass: "2019Matter"
    }
  });

  // Check if the user already exist
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // if user allready exist then deny request from front
      res.json({ result: false });
    } else {
      // If not exist - create user object according to mongoose schema
      crypto.randomBytes(20, function(err, buf) {
        let token = buf.toString("hex");
        const newUser = new User({
          firstName: req.body.firstName,
          secondName: req.body.secondName,
          email: req.body.email,
          password: req.body.password,
          confirmLoginToken: token
        });
        newUser
          .save()
          .then(user => {
            readHTMLFile(
              __dirname + "/../templatesMail/confirmRegistration.html",
              function(err, html) {
                let template = handlebars.compile(html);
                let replacements = {
                  link: `http://localhost:3000/verify/${user.confirmLoginToken}`
                };
                let htmlToSend = template(replacements);

                //send welcome email
                const mailOptions = {
                  from: "2019.matter.store@gmail.com",
                  to: user.email,
                  subject: "CONFIRM REGISTRATION",
                  html: htmlToSend
                };
                transporter.sendMail(mailOptions, function(err, info) {
                  if (err) console.log(err);
                  else {
                    // console.log(info);
                  }
                });
              }
            );

            res.json(user);
          })
          .catch(err => console.log(err));
      });
    }
  });
});

//Send post-request from Login form
router.post("/login", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.json({ success: false });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.json({ success: false });
      }

      let payload = { ...user };

      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 172800 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    });
  })(req, res);
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

router.get(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

router.post("/update-profile/personal-info", (req, res) => {
  // const {errors, isValid} = validateRegisterInput(req.body);

  // Check validation
  // if (!isValid) {
  //
  //     console.log('hi errors');
  //     return res.status(400).json(errors); //If not valid - send information about errors to client-side (React)
  // }

  // Check if the email already exist
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // Email can be exist but its owner is current user
      if (req.body.id != user._id) {
        res.json({ status: "exist-email", data: {} });
      } else {
        User.update(
          { _id: req.body.id },
          {
            $set: {
              firstName: req.body.firstName,
              secondName: req.body.secondName,
              email: req.body.email
            }
          }
        )
          .then(() => {
            //we will send updated user to FRONT after updating
            User.findOne({ _id: req.body.id }).then(user => {
              res.json({ status: "success", userinfo: user });
            });
          })
          .catch(err => console.log(err));
      }
    } else {
      // updating only three fields in the object in database
      User.update(
        { _id: req.body.id },
        {
          $set: {
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            email: req.body.email
          }
        }
      )
        .then(() => {
          //we will send updated user to FRONT after updating
          User.findOne({ _id: req.body.id }).then(user => {
            res.json({ status: "success", userinfo: user });
          });
        })
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
  User.findOne({ _id: req.body.id }, function(err, user) {
    let oldPassword = req.body.password;
    // we get info from database by id and compare passwords ()
    user.comparePassword(oldPassword, function(err, isMatch) {
      if (!isMatch) {
        // is password in database and password from the field "Current password aren't matched"
        res.json({ status: "incorrect-password", data: {} });
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
            User.update(
              { _id: req.body.id },
              {
                $set: {
                  password: newPass
                }
              }
            ).then(() => {
              res.json({ status: "success", data: {} });
            });
          });
        });
      }
    });
  });
});

module.exports = router;
