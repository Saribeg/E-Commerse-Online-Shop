const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");

const Product = require("../models/Product");


router.post('/checkAvailableItem', (req, res) => {

    console.log("checkAvailableItem")

    let isUpdated = 0;
    let checkArr = [];

    let readyArr = [];

    let sizeAvailable = 0;
    let colorAvailable = 0;
    let currentPrice = 0;

    req.body.arrItemData.forEach((elem) => {
        checkArr.push(elem)
    });
    //
    // console.log("checkArr", checkArr);


    let arrMessage = [
        "This product is withdrawn from sale",
        "This color is not available",
        "This size in this color is not available",
        "You can order only this amount of items - "
    ]


    checkArr.forEach((elem, index) => {

        console.log('check product ', index)

        Product.findOne({_id: elem.id})
            .then(info => {
                if (info) {
                    if (info.withdrawnFromSale === "true") {
                        if (!elem.reasonNotAvailable === arrMessage[0]) {
                            isUpdated = 1;
                            elem.isAvailable = false;
                            elem.reasonNotAvailable = arrMessage[0]
                        }
                    } else {

                        if (elem.currentPrice !== info.currentPrice) {
                            isUpdated = 1;
                            elem.currentPrice = info.currentPrice;
                        }

                        info.productFeatures.forEach((elemColors) => {

                            elemColors.sizes.forEach((elemSizes) => {

                                if (elemSizes.size === elem.size && elemColors.colorName === elem.colorName) {
                                    sizeAvailable = elemSizes.quantity;
                                }
                                colorAvailable += elemSizes.quantity;

                            })

                        });

                        if (colorAvailable === 0) {
                            if (!elem.reasonNotAvailable !== arrMessage[1]) {
                                isUpdated = 1;
                                elem.isAvailable = false;
                                elem.reasonNotAvailable = arrMessage[1]
                            }
                        } else if (sizeAvailable === 0) {
                            if (!elem.reasonNotAvailable !== arrMessage[2]) {
                                isUpdated = 1;
                                elem.isAvailable = false;
                                elem.reasonNotAvailable = arrMessage[1]
                            }
                        } else if (elem.amount < sizeAvailable) {
                            if (!elem.reasonNotAvailable.includes(arrMessage[3])) {
                                isUpdated = 1;
                                elem.isAvailable = false;
                                elem.reasonNotAvailable = arrMessage[3] + sizeAvailable
                            }
                        } else {
                            if (elem.isAvailable === false) {
                                isUpdated = 1;
                                elem.isAvailable = true;
                                elem.reasonNotAvailable = ""
                            }

                        }

                    }
                } else {

                    if (!elem.reasonNotAvailable === arrMessage[0]) {
                        isUpdated = 1;
                        elem.isAvailable = false;
                        elem.reasonNotAvailable = arrMessage[0]
                    }
                }

                readyArr.push(elem);

                console.log('index ', index, ' array ', readyArr[index]);


            })
            .catch(err => {
                console.log(err);


            });


    });


    console.log('END isUpdated', isUpdated);
    console.log('END readyArr', readyArr);


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