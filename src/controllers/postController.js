import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../services/postService.js';

import { matchedData } from 'express-validator';

export async function getAllPostsHandler(req, res) {
  const {categoryId, search, sortBy = "createdAt", sortOrder="desc",limit=10,offset=0} = req.query;
  const filter = {}
  if (categoryId) filter.categoryId = parseInt(categoryId);
  if(search) filter.search = search;
  filter.sortBy = sortBy;
  filter.sortOrder = sortOrder;
  filter.limit = parseInt(limit);
  filter.offset = parseInt(offset);

  let result = await getAllPosts(filter);
  res.status(200).json(result);
}

export async function getPostByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let post = await getPostById(id);
  res.status(200).json(post);
}

export async function createPostHandler(req, res) {
  let data = req.body;
  let newPost = await createPost(data);
  res.status(201).json(newPost);
}

export async function updatePostHandler(req, res) {
  let id = parseInt(req.params.id);
  const updates = {};
  if(req.body.title) updates.title = req.body.title;
  if(req.body.categoryId) updates.categoryId = req.body.categoryId;
  if(req.body.content) updates.content = req.body.content;

  const updatedPost = await updatePost(id, updates);
  res.status(200).json(updatedPost);
}

export async function deletePostHandler(req, res) {
  let id = parseInt(req.params.id);
  await deletePost(id);
  res.status(204).send();
}
