import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';

import {
  successResponse,
} from '../utils/response.utils.js';


// REGISTER USER
export const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  // CHECK EMPTY FIELDS
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  // CHECK EXISTING USER
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  // CREATE USER
  const user = await User.create({
    name,
    email,
    password,
  });

  return successResponse(
    res,
    'User registered successfully',
    {
      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
    201
  );

});


// LOGIN USER
export const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  // CHECK EMPTY FIELDS
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  // FIND USER
  const user = await User.findOne({ email });

  // CHECK USER EXISTS
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // CHECK PASSWORD
  const isPasswordCorrect =
    await user.comparePassword(password);

  if (!isPasswordCorrect) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  return successResponse(
    res,
    'Login successful',
    {
      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    }
  );

});


// GET CURRENT USER
export const getMe = asyncHandler(async (req, res) => {

  return successResponse(
    res,
    'Current user fetched successfully',
    {
      user: req.user,
    }
  );

});