const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username : user.username, email: user.email }, secretKey, { expiresIn: '1h' });
};

module.exports = generateToken;