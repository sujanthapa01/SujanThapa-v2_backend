// Routes/router.js
const express = require('express');
const router = express.Router();
const { login, handlenewUser,  handleForgetPassword} = require("../controller/AuthController.js");
const { renderResetPasswordForm, handleResetPassword } = require('../controller/auth.js');
const verifyToken = require('../middleware/middleware.js');

router.post('/login', login);
router.post('/signup', handlenewUser);
router.post('/forget-password', handleForgetPassword);
router.get('/reset-password/:token', renderResetPasswordForm);
router.post('/reset-password/:token', handleResetPassword);
router.get('/protected-route', verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
