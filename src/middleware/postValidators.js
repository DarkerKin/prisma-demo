import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validatePostId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Post id must be a positive integer'),
  handleValidationErrors,
];

export const validatePostQuery = [
  query('title').optional().trim().escape().toLowerCase(),

  handleValidationErrors,
];

export const validateCreatePost = [
  body('title')
    .exists({ values: 'falsy' })
    .withMessage('title is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('title must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('title must be at least 3 characters'),

  body('content')
    .exists({ values: 'falsy' })
    .withMessage('content is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('content must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('content must be at least 10 characters'),

  handleValidationErrors,
];

export const validateUpdatePost = [
  oneOf(
    [
      body('title').exists({ values: 'falsy' }),
      body('content').exists({ values: 'falsy' }),
    ],
    {
      message: 'At least one field (title, content) must be provided',
    },
  ),

  body('title')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('title must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('title must be at least 3 characters'),

  body('content')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('content must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('content must be at least 10 characters'),

  handleValidationErrors,
];
