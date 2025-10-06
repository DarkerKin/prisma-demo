import { param, query, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateCategoryId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer'),
  handleValidationErrors,
];

export const validateCategory = [
  body('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('name is required')
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters'),

  handleValidationErrors,
];
