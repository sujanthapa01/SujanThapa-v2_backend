const bcrypt = require('bcrypt');
const User = require('../model/DBmodel'); // Adjust path as per your project structure

// Function to render the password reset form
async function renderResetPasswordForm(req, res) {
  const { token } = req.params;

  try {
    // Find user by reset token and check expiry
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log(`Invalid or expired token: ${token}`);
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    // Render a form for the user to reset their password
    res.send(`
      <html>
        <body>
          <h3>Reset Your Password</h3>
          <form action="/reset-password/${token}" method="POST">
            <input type="password" name="password" placeholder="Enter new password" required>
            <button type="submit">Reset Password</button>
          </form>
        </body>
      </html>
    `);

  } catch (error) {
    console.error('Error finding user by token:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Function to handle password reset form submission
async function handleResetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Find user by reset token and check expiry
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // Inform the user that their password has been successfully reset
    res.status(200).json({ message: 'Password reset successful. You can now log in with your new password.' });

  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  renderResetPasswordForm,
  handleResetPassword,
};
