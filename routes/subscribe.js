const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const Subscribe = require('../models/Subscribe');
const handlebars = require('handlebars');
const fs = require('fs');

const readHTMLFile = function (path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

router.post('/subscribe', (req, res) => {

    //add mail to db collection
    const newSubscribeMail = {};
    newSubscribeMail.mail = req.body.subMail.mail;
    let dbMailObj = new Subscribe(newSubscribeMail);
    dbMailObj.save()
        .then(newSubscribeMail => res.json(newSubscribeMail))
        .catch(err => console.log(err));

    //authorization for sending welcome email
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '2019.matter.store@gmail.com',
            pass: '2019Matter'
        }
    });

    //add ObjectId from db to html link (for unsubscribe) in welcome mail
    readHTMLFile(__dirname + '/../subscribeMail/subscribeMail.html', function (err, html) {
        let template = handlebars.compile(html);
        let replacements = {
            mailId: dbMailObj._id
        };
        let htmlToSend = template(replacements);

        //send welcome email
        const mailOptions = {
            from: '2019.matter.store@gmail.com',
            to: req.body.subMail.mail,
            subject: 'SUBSCRIBE',
            html: htmlToSend
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err);
            else
                console.log(info);
        });
    });
});

module.exports = router;