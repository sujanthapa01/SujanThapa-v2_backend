const mongoose = require('mongoose');

// Define schema
const createDBModel = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const User = mongoose.model("User", createDBModel);


User.init()
  .then(() => console.log('User model created successfully'))
  .catch((error) => console.error('Error creating User model:', error));

module.exports = User;
