const express = require("express");
const router = express.Router();
const StaticPage = require("../models/StaticPage");

router.get("/about-us", (req, res) => {
  StaticPage.findOne({title: 'About us'})
    .then((content) => {
		 res.json(content)})
    .catch(err => console.log(err));
});
module.exports = router;