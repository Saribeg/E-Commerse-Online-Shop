const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");

const Product = require("../models/Product");


router.post('/checkAvailableItem', (req, res) => {


    let isUpdated = 0;

    let checkArr = [];

    console.log('req.body.arrItemData',req.body.arrItemData)

    req.body.arrItemData.forEach((elem) => {
        checkArr.push(elem)
    });

    console.log("checkArr", checkArr);


    let arrMessage = [
        "This product is withdrawn from sale",
        "This color is not available",
        "This size in this color is not available",
        "You can order only this amount of items - "
    ]


    checkArr.forEach((elem, index) => {


        Product.findOne({_id: elem.id})
            .then(info => {

                if (!info || info.withdrawnFromSale === "true") {




                    if (!elem.reasonNotAvailable === arrMessage[0]) {
                        isUpdated = 1;
                        elem.isAvailable = false;
                        elem.reasonNotAvailable = arrMessage[0]
                    }

                    // res.json({success: false, message: "This product is withdrawn from sale"})
                } else {

                    if (elem.reasonNotAvailable === arrMessage[0]) {
                        isUpdated = 1;
                        elem.isAvailable = true;
                        elem.reasonNotAvailable = ''
                    }



                    info.productFeatures.forEach((elemColors) => {


                        if (elemColors.colorName === req.body.colorName) {

                            elemColors.sizes.forEach((elemSizes) => {



                            })

                        }


                    })


                }


            })
            .catch(err => {
                console.log(err);


            });



    })



});

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