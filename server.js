const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");


const users = require("./routes/users");
const navigationMenuItems = require("./routes/navigationMenuItems");
const products = require("./routes/products");
const carouselItems = require("./routes/carouselItems");
const subscribe = require("./routes/subscribe");
const unsubscribe = require("./routes/unsubscribe");
const footerLinks = require("./routes/footer-links");
const colors = require("./routes/filters/colors");
const sizes = require("./routes/filters/sizes");
const categoryCarousels = require("./routes/categoryCarousels");
const cart = require("./routes/cart");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport)

app.use("/users", users);
app.use("/", navigationMenuItems);
app.use("/", products);
app.use("/", carouselItems);
app.use("/", subscribe);
app.use("/", unsubscribe);
app.use("/", footerLinks);
app.use("/", colors);
app.use("/", sizes);
app.use("/", cart);


app.use("/", categoryCarousels);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
