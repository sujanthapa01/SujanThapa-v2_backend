const express = require('express');
const router = express.Router();
const {login, signup} = require("../controller/controller.js")

router.get('/', login);
router.get('/signup',signup);

module.exports = router;