// const nodemailer = require("nodemailer");
// const express = require("express");
// const router = express.Router();
//
// router.post('/subscribe', (req, res) => {
//     console.log(req, res);
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: '2019.matter.store@gmail.com',
//             pass: '2019Matter'
//         }
//     });
//
//     const mailOptions = {
//         from: '2019.matter.store@gmail.com',
//         to: 'denis.kanivets@ukr.net',
//         subject: 'SUBSCRIBE FOR UPDATES ',
//         html: '<p>Hello world! It works!!!!!</p>'
//     };
//
//     transporter.sendMail(mailOptions, function (err, info) {
//         if(err)
//             console.log(err);
//         else
//             console.log(info);
//     });
// });
//
// module.exports = router;
//
