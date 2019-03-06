const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");

const Product = require("../models/Product");


router.post('/checkAvailableItem', (req, res) => {

    // console.log("checkAvailableItem")

    let isUpdated = 0;
    let checkArrIndex = [];
    let checkArr = [];

    let readyArr = [];

    let sizeAvailable = 0;
    let colorAvailable = 0;
    let currentPrice = 0;

    req.body.arrData.forEach((elem) => {
        checkArrIndex.push(elem.id)
        checkArr.push(elem);
    });

    // console.log("checkArr", checkArrIndex);


    let arrMessage = [
        "This product is withdrawn from sale",
        "This color is not available",
        "This size in this color is not available",
        "You can order only this amount of items - "
    ]

    // console.log('req.body', req.body);

    // let elem = req.body.itemData;


    // readyArr = checkArr.map( (elem, index) => {

    // console.log('check product ', index)

    // Product.findOne({_id: elem.id})
    Product.find({_id: {$in: checkArrIndex}})
        .then(info => {

            if (info.length > 0) {

                let interArray = [];

                //if in an array from client and an array from DB different amount of items then have to deal this case
                //and save array correct indexes in interArray
                let j = 0;
                for (let i = 0; i < checkArr.length; i++) {
                    if (checkArr[i].id == info[j]._id) {

                        if (info[j].withdrawnFromSale === true) {

                            if (checkArr[i].reasonNotAvailable !== arrMessage[0]) {
                                // console.log('update 1')
                                isUpdated = 1;
                                checkArr[i].isAvailable = false;
                                checkArr[i].reasonNotAvailable = arrMessage[0]
                            }
                        } else {

                            // console.log('not withdrawn ', info[j]._id);

                            if (Number(checkArr[i].priceFormDB) !== info[j].currentPrice) {
                                // console.log('update 2')
                                isUpdated = 1;
                                checkArr[i].priceFormDB = info[j].currentPrice;
                            }

                            info[j].productFeatures.forEach((elemColors) => {

                                elemColors.sizes.forEach((elemSizes) => {


                                    if (elemSizes.size === checkArr[i].size && elemColors.colorName === checkArr[i].colorName) {
                                        sizeAvailable = elemSizes.quantity;
                                    }
                                    colorAvailable += elemSizes.quantity;

                                })

                            });

                            if (colorAvailable === 0) {
                                if (checkArr[i].reasonNotAvailable !== arrMessage[1]) {
                                    // console.log('update 3')
                                    isUpdated = 1;
                                    checkArr[i].isAvailable = false;
                                    checkArr[i].reasonNotAvailable = arrMessage[1]
                                }
                            } else if (sizeAvailable === 0) {
                                if (checkArr[i].reasonNotAvailable !== arrMessage[2]) {
                                    // console.log('update 4')
                                    isUpdated = 1;
                                    checkArr[i].isAvailable = false;
                                    checkArr[i].reasonNotAvailable = arrMessage[2]
                                }
                            } else if (checkArr[i].amount > sizeAvailable) {
                                if (checkArr[i].reasonNotAvailable !== arrMessage[3] + sizeAvailable) {
                                    // console.log('update 5')
                                    isUpdated = 1;
                                    checkArr[i].isAvailable = false;
                                    checkArr[i].reasonNotAvailable = arrMessage[3] + sizeAvailable
                                }
                            } else {
                                if (checkArr[i].isAvailable === false) {
                                    // console.log('update 6')
                                    isUpdated = 1;
                                    checkArr[i].isAvailable = true;
                                    checkArr[i].reasonNotAvailable = ""
                                }

                            }

                        }

                        interArray[i] = checkArr[i];
                        j++;
                    } else {
                        if (checkArr[i].reasonNotAvailable === arrMessage[0]) {
                            //If in object was status false with reason "not available"
                            //then we don't call rewrite Redux store in action
                            interArray[i] = checkArr[i];
                        } else {
                            //If ID doesn't exist in DB then write in object available FALSE and call change redux store
                            // console.log('update 7')
                            isUpdated = 1;
                            checkArr[i].isAvailable = false;
                            checkArr[i].reasonNotAvailable = arrMessage[0];
                            interArray[i] = checkArr[i];
                        }
                    }
                }

                // console.log('isUpdated', isUpdated)

                res.json({
                    wasUpdated: isUpdated,
                    updatedArray: interArray
                })

                // console.log('interArray', interArray);



            }





        })
        .catch(err => {
            console.log(err);


        });


    // });


});

router.post('/setSavedCart', (req, res) => {

    // console.log('setSavedCart');

    let newCart = {
        idUser: req.body.userId,
        isFinished: false,
        arrayProduct: JSON.parse(req.body.arrLS)
    };
    // console.log('newCart', newCart);

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

    // console.log('updateCart')

    Cart.update({_id: req.body.idCartInDB}, {
        $set: {
            arrayProduct: JSON.parse(req.body.arrayProduct)
        }
    }).then(() => {
        res.json({
            success: true,
        })
    })
        .catch(err => console.log(err));


});

module.exports = router;