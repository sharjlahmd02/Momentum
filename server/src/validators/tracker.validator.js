import {
  body,
  validationResult,
} from 'express-validator';


// CREATE TRACKER VALIDATION
export const createTrackerValidation = [

  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')

    .isLength({ max: 50 })
    .withMessage(
      'Title cannot exceed 50 characters'
    ),

  body('type')
    .isIn([
      'annual',
      'monthly',
      'custom',
    ])
    .withMessage('Invalid tracker type'),

  body('description')
    .optional()
    .isLength({ max: 200 })
    .withMessage(
      'Description cannot exceed 200 characters'
    ),

];


// UPDATE TRACKER VALIDATION
export const updateTrackerValidation = [

  body('title')
    .optional()
    .isLength({ max: 50 })
    .withMessage(
      'Title cannot exceed 50 characters'
    ),

  body('description')
    .optional()
    .isLength({ max: 200 })
    .withMessage(
      'Description cannot exceed 200 characters'
    ),

];


// CHECK-IN VALIDATION
export const checkInValidation = [

  body('trackerId')
    .notEmpty()
    .withMessage('Tracker ID is required'),

];


// VALIDATION RESULT HANDLER
export const validate = (
  req,
  res,
  next
) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });

  }

  next();
};