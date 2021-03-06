const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const handlebars = require('handlebars');
const fs = require('fs');

const CartUnregistered = require("../models/CartUnregistered");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(10000000, 19999999);

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

router.post('/sendOrder', (req, res) => {

    //add mail to db collection
    // const newSubscribeMail = {};
    // newSubscribeMail.mail = req.body.subMail.mail;
    // let dbMailObj = new Subscribe(newSubscribeMail);
    // dbMailObj.save()
    //     .then(newSubscribeMail => res.json(newSubscribeMail))
    //     .catch(err => console.log(err));

    //authorization for sending welcome email
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '2019.matter.store@gmail.com',
            pass: '2019MatterStore'
        }
    });


    //add ObjectId from db to html link (for unsubscribe) in welcome mail
    readHTMLFile(__dirname + '/../templatesMail/order.html', function (err, html) {
        let template = handlebars.compile(html);
        let replacements = {
            orderNo: req.body.orderNo,
            orderList: String(req.body.textOrder)
        };
        let htmlToSend = template(replacements);

        //send welcome email
        const mailOptions = {
            from: '2019.matter.store@gmail.com',
            to: req.body.mail,
            subject: 'YOUR ORDER',
            html: htmlToSend
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err);
            else {
                // console.log(info);
            }

        });


        const mailOptionsManager = {
            from: '2019.matter.store@gmail.com',
            to: '2019.matter.store@gmail.com',
            subject: 'ORDER ON SITE',
            html: htmlToSend
        };
        transporter.sendMail(mailOptionsManager, function (err, info) {
            if (err)
                console.log(err);
            else {
                // console.log(info);
            }
        });

    });
});


router.post('/sendOrderByEmail', (req, res) => {

    let order = rand();

    // console.log('req.body.dataOrder', req.body.dataOrder)

    let newCart = {
        email: req.body.mail,
        orderNo: order,
        arrayProduct: req.body.dataOrder.arrayProduct
    }
    const dbCart = new CartUnregistered(newCart);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '2019.matter.store@gmail.com',
            pass: '2019MatterStore'
        }
    });

    dbCart
        .save()
        .then(() => {
            //add ObjectId from db to html link (for unsubscribe) in welcome mail
            readHTMLFile(__dirname + '/../templatesMail/order.html', function (err, html) {
                let template = handlebars.compile(html);
                let replacements = {
                    orderNo: order,
                    orderList: String(req.body.textOrder)
                };
                let htmlToSend = template(replacements);

                //send welcome email
                const mailOptions = {
                    from: '2019.matter.store@gmail.com',
                    to: req.body.mail,
                    subject: 'YOUR ORDER',
                    html: htmlToSend
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err)
                        console.log(err);
                    else
                        console.log(info);
                });


                const mailOptionsManager = {
                    from: '2019.matter.store@gmail.com',
                    to: '2019.matter.store@gmail.com',
                    subject: 'ORDER ON SITE',
                    html: htmlToSend
                };
                transporter.sendMail(mailOptionsManager, function (err, info) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(info);
                        res.json({success: true, orderNo: order})
                    }


                });

            });

        })


});


module.exports = router;