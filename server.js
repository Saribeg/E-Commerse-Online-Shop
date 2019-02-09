const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/users");
const navigationMenuItems = require("./routes/navigationMenuItems");
const products = require("./routes/products");
const carouseltems = require("./routes/carouseltems");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/users", users);
app.use("/", navigationMenuItems);
app.use("/", products);
app.use("/", carouseltems);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));