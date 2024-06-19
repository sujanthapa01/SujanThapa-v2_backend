const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, password: user.password }, secretKey, { expiresIn: '1h' });
};

module.exports = generateToken;
