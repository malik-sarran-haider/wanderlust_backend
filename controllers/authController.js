const User = require('../models/User');
const bcrypt = require('bcryptjs');

const signUp = async (req, res) => {
  const { username, email, password, profession } = req.body; // Corrected typo here

  try {
    let user = await User.findOne({ email, username});

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
  

    user = new User({
      username,
      email,
      password,
      profession // Corrected typo here
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ success: 'true' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ success: 'true' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  signUp,
  login,
};
