import express from "express";

import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authcontroller.js";
import protect from "../middleware/auth.middleware.js";
import {
  registerValidation,
  loginValidation,
  validate,
} from "../validators/auth.validator.js";

const router = express.Router();

// REGISTER ROUTE
router.post("/register", registerValidation, validate, registerUser);

// LOGIN ROUTE
router.post("/login", loginValidation, validate, loginUser);    

// GET CURRENT USER ROUTE
router.get("/me", protect, getMe);

export default router;
