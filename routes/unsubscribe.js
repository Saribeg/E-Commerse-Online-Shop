const express = require("express");
const router = express.Router();
const Subscribe = require('../models/Subscribe');

router.post('/unsubscribe/:id', (req, res) => {
    console.log(req.params.id);

    //change mail status to false and unsubscribe
    Subscribe.updateOne({_id: req.params.id},
        {status: 'false'},
        function (err, affected, resp) {
            console.log('unsubscribe => change status to false')
        })
});

module.exports = router;