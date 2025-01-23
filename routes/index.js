const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn')
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');

router.get("/", function (req, res) {
    const error = req.flash("error");
    res.render("index", {error, isLoggedIn: false} );
})

router.get("/shop", isLoggedIn ,async function (req, res) {;
    let success =  req.flash("success");
    let products = await productModel.find();
    res.render("shop", {products, success} );
})

router.get("/addtocart/:id", isLoggedIn ,async function (req, res) {
   let user = await userModel.findOne({email: req.user.email});
   user.cart.push(req.params.id);
   await user.save();
   req.flash("success","Added to cart");
   res.redirect("/shop");
})

router.get("/cart", isLoggedIn ,async function (req, res) {
    let user = await userModel.findOne({email: req.user.email}).populate("cart");
    res.render("cart", {user});
})

module.exports = router;