const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logout} = require('../controllers/authController');
const isLoggedIn = require('../middleware/isLoggedIn')

router.get("/", function (req, res) {
    res.send("hey");
})

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isLoggedIn, logout);



module.exports = router;