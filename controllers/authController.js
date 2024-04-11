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
    const User = require('../models/User');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    
    const signUp = async (req, res) => {
      const { username, email, password, profession } = req.body;
    
      try {
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });
    
        if (existingUser) {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
    
        const newUser = new User({
          username,
          email,
          password,
          profession
        });
    
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
    
        await newUser.save();
    
        res.status(201).json({ success: true });
      } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: error.message }); // Send the error message back to the client
      }
    };
    
    const login = async (req, res) => {
      const { email, password } = req.body;
    
      try {
        let user = await User.findOne({ email });
    
        if (!user) {
          return res.status(400).json({ error: 'Invalid credentials' });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
          return res.status(400).json({ error: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        res.status(200).json({
          success: true,
          token,
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            profession: user.profession
          },
        });
      } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: error.message });
      }
    };
    
    module.exports = {
      signUp,
      login,
    };
    
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
