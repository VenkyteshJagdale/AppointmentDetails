const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        return res.status(500).json({ msg: 'Server error' });
      }
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        return res.status(500).json({ msg: 'Server error' });
      }
      res.json({ token, role: user.role });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = {
  login,
  register
}
