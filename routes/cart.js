const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");


router.post('/setSavedCart', (req, res) => {

    console.log('setSavedCart');

    let newCart = {
        idUser: req.body.userId,
        isFinished: false,
        arrayProduct: JSON.parse(req.body.arrLS)
    };
    console.log('newCart', newCart);

    Cart.deleteOne({idUser: req.body.userId, isFinished: false})
        .then(() => {
            console.log('after delete')

            let dbCart = new Cart(newCart);

            dbCart
                .save()
                .then(item => {
                        res.json({
                            success: true,
                            // idCartInDB: item._id,
                            item: item,
                        })
                    }
                )
                .catch(err => {
                    res.json({
                        success: false,
                        idCartInDB: '',
                    });
                    console.log(err)
                });
        })


});


router.post('/getCart', (req, res) => {

    Cart.findOne({idUser: req.body.idUser, isFinished: false})
        .then(info => {
            if (info) {
                res.json({
                    success: true,
                    infoDB: JSON.stringify(info),
                });
            } else {
                res.json({
                    success: false,
                    infoDB: JSON.stringify({}),
                });
            }

        })
        .catch(err => {
            console.log(err);


        });

});

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
            });
            console.log(err)
        });


});

router.post('/updateCart', (req, res) => {

    Cart.update({_id: req.body.idCartInDB}, {
        $set: {
            arrayProduct: JSON.parse(req.body.arrayProduct)
        }
    })
        .catch(err => console.log(err));


});

module.exports = router;