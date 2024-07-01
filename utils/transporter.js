require('dotenv').config
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : 'sujanthapast0@gmail.com',
        pass : process.env.APP_PASS
    }
})

module.exports = transporter