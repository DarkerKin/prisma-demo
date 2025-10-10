import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../services/postService.js';

import { matchedData } from 'express-validator';

export async function getAllPostsHandler(req, res) {
  const {categoryId, search} = req.query;
  const filter = {}
  if (categoryId) filter.categoryId = categoryId;
  if(search) filter.search = search;
  let result = await getAllPosts(filter);
  res.status(200).json(result);
}

export async function getPostByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let post = await getPostById(id);
  res.status(200).json(post);
}

export function createPostHandler(req, res) {
  let data = req.body;
  let newPost = createPost(data);
  res.status(201).json(newPost);
}

export function updatePostHandler(req, res) {
  let id = parseInt(req.params.id);
  let updates = req.body;
  const updatedPost = updatePost(id, updates);
  res.status(200).json(updatedPost);
}

export function deletePostHandler(req, res) {
  let id = parseInt(req.params.id);
  deletePost(id);
  res.status(204).send();
}
