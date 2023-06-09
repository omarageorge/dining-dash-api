import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Controller method for handling user registration
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Successfully created account' });
  } catch (error) {
    res.status(400);
    throw new Error('User already exists');
  }
};

// Controller method for handling user login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({ token: generateToken(user._id) });
    }
  } catch (error) {}
};

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  });
}
