import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService.js';

import { matchedData } from 'express-validator';

export function getAllCategoriesHandler(req, res) {
  let result = getAllCategories();
  res.status(200).json(result);
}

export function getCategoryByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let category = getCategoryById(id);
  res.status(200).json(category);
}

export function createCategoryHandler(req, res) {
  let data = req.body;
  let newCategory = createCategory(data);
  res.status(201).json(newCategory);
}

export function updateCategoryHandler(req, res) {
  let id = parseInt(req.params.id);
  let updates = req.body;
  const updatedCategory = updateCategory(id, updates);
  res.status(200).json(updatedCategory);
}

export function deleteCategoryHandler(req, res) {
  let id = parseInt(req.params.id);
  deleteCategory(id);
  res.status(204).send();
}
