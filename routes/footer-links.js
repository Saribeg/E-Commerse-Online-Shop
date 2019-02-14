const express = require("express");
const router = express.Router();
const FooterLinks = require("../models/FooterLinks");

// Route for adding new items to Carousel
router.get("/get-footer", (req, res) => {

  FooterLinks.find({}, (err, item) => {
		 res.send(item);
	})
    .catch(err => console.log(err));
});

module.exports = router;