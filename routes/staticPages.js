const express = require("express");
const router = express.Router();
const StaticPage = require("../models/StaticPage");

router.get("/about-us", (req, res) => {
  StaticPage.find({})
    .then((content) => {
			res.send(content)})
    .catch(err => console.log(err));
});
module.exports = router;