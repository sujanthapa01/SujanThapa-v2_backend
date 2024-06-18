const express = require('express');
const router = express.Router();
const {login,handlenewUser } = require("../controller/controller.js")

router.get('/', login);
router.post('/signup',handlenewUser);

module.exports = router;


