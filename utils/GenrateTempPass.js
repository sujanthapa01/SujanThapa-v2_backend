const crypto = require('crypto');

function generateTempPassword(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let tempPassword = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    tempPassword += chars[randomIndex];
  }

  return tempPassword;
}

module.exports = generateTempPassword;
