const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");


router.post('/addCart', (req, res) => {

    let newCart = {
        idUser: req.body.idUser,
        isFinished: false,
        arrayProduct: JSON.parse(req.body.arrayProduct)
    }

    const dbCart = new Cart(newCart);

    dbCart
        .save()
        .then(item => {

                res.json({
                    success: true,
                    idCartInDB: item._id,
                })
            }
        )
        .catch(err => {
            res.json({
                success: false,
                idCartInDB: '',
            })
            console.log(err)
        });


});

router.post('/updateCart', (req, res) => {

    Cart.update({_id: req.body.idCartInDB}, {
        $set: {
            arrayProduct: JSON.parse(req.body.arrayProduct)
        }
    })
        .then((item) => {

            console.log('back update, item')
            console.log(item)

            }
        )
        .catch(err => console.log(err));


});

module.exports = router;