import express from 'express';
import {
  validatePostId,
  validatePostQuery,
  validateCreatePost,
  validateUpdatePost,
} from '../middleware/postValidators.js';

import {
  getAllPostsHandler,
  getPostByIdHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
} from '../controllers/postController.js';

const router = express.Router();

router.get('/', validatePostQuery, getAllPostsHandler);

router.get('/:id', validatePostId, getPostByIdHandler);

router.post('/', validateCreatePost, createPostHandler);

router.put('/:id', validatePostId, validateUpdatePost, updatePostHandler);

router.delete('/:id', validatePostId, deletePostHandler);

export default router;
