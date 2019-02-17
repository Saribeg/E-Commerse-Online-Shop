const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const Subscribe = require('../models/Subscribe');

router.post('/subscribe', (req, res) => {
    const newSubscribeMail ={};
    newSubscribeMail.mail = req.body.subMail.mail;
    new Subscribe(newSubscribeMail)
        .save()
        .then(newSubscribeMail => res.json(newSubscribeMail))
        .catch(err => console.log(err));

    console.log(req.body.subMail.mail);

    //send welcome email
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '2019.matter.store@gmail.com',
            pass: '2019Matter'
        }
    });
    const mailOptions = {
        from: '2019.matter.store@gmail.com',
        to: req.body.subMail.mail,
        subject: 'SUBSCRIBE',
        html: {path: 'subscribeMail/subscribeMail.html'}
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log(info);
    });
});

module.exports = router;