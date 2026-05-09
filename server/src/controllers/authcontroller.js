import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';


// REGISTER USER
export const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // CHECK EMPTY FIELDS
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    // CHECK EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password,
    });

    // RESPONSE
    res.status(201).json({
      message: 'User registered successfully',

      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// LOGIN USER
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // CHECK EMPTY FIELDS
    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    // FIND USER
    const user = await User.findOne({ email });

    // CHECK USER EXISTS
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // CHECK PASSWORD
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // SUCCESS RESPONSE
    res.status(200).json({
      message: 'Login successful',

      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET CURRENT USER
export const getMe = async (req, res) => {

  res.status(200).json({
    user: req.user,
  });

};