import express from 'express';
import {
  validateCategoryId,
  validateCategory,
} from '../middleware/categoryValidators.js';

import {
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getAllCategoriesHandler);

router.get('/:id', validateCategoryId, getCategoryByIdHandler);

router.post('/', validateCategory, createCategoryHandler);

router.put('/:id', validateCategoryId, validateCategory, updateCategoryHandler);

router.delete('/:id', validateCategoryId, deleteCategoryHandler);

export default router;
