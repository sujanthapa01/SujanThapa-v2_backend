const User = require("../model/DBmodel");
const generateToken = require('../utils/GenrateToken')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const generateTempPassword = require('../utils/GenrateTempPass')
const transporter = require('../utils/transporter')


async function handlenewUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    console.log("User saved successfully:", newUser);
    res.status(201).json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error, user not registered" });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
  const token = generateToken(user);

    // Return token to client
    res.json({ token });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error, login failed" });
  }
}

// Function to handle password reset request by email
async function handleForgetPassword(req, res) {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate a temporary password
    const tempPassword = generateTempPassword(); // Implement your function to generate a temporary password

    // Hash the temporary password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(tempPassword, saltRounds);

    // Update user's password in the database
    user.password = hashedPassword;
    await user.save();

    // Send the temporary password to the user via email
    const mailOptions = {
      from: 'sujanthapa.support@gmail.com',
      to: email,
      subject: 'Temporary Password for Password Reset',
      text: `Your temporary password is: ${tempPassword}\n\n`
        + `Please use this temporary password to log in and reset your password.\n`
        + `For security reasons, please change your password after logging in.\n`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending temporary password:', error);
        return res.status(500).json({ message: 'Failed to send temporary password' });
      }
      console.log('Temporary password sent successfully:', info.response);
      res.status(200).json({ message: 'Temporary password sent successfully. Check your email.' });
    });

  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = handleForgetPassword;


module.exports = { handlenewUser, login, handleForgetPassword};

