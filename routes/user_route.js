var express = require("express");
var route = express.Router();

// User Routes
route.get("/", function (req, res) {
    res.render("user/home.ejs");
});

route.get("/about", function (req, res) {
    res.render("user/about.ejs");
});

route.get("/contact", function (req, res) {
    res.render("user/contact.ejs");
});

route.get("/shop", function (req, res) {
    res.render("user/shop.ejs");
});

route.get("/Categories", function (req, res) {
    res.render("user/Categories.ejs");
});

route.get("/Blog", function (req, res) {
    res.render("user/Blog.ejs");
});





module.exports = route;
