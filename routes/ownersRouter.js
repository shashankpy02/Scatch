const express = require('express');
const ownerModel = require('../models/owner.model');
const router = express.Router();


if(process.env.NODE_ENV === "development"){
    router.post("/create",async function (req, res) {
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res.send(503).send("you dont have permission to create a new owner.");
        }

        let {fullname, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        }) 
        res.send(201).send(createdOwner);
    })
}


router.get("/admin", function (req, res) {
    let success = req.flash("success");
    res.render("createproducts",{success});
})

module.exports = router;