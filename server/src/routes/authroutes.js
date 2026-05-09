import express from 'express';

import { registerUser, loginUser, getMe } from '../controllers/authcontroller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();


// REGISTER ROUTE
router.post('/register', registerUser);

// LOGIN ROUTE
router.post('/login', loginUser);

// GET CURRENT USER ROUTE
router.get('/me', protect, getMe);

export default router;