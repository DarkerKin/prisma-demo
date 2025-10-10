import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../respositories/postRepo.js';
export async function getAllPosts(filter) {
  return await getAll(filter);
}

export async function getPostById(id) {
  let result = await getById(id);
  if (result) return result;
  else {
    const error = new Error(`Cannot find post with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export function createPost(data) {
  const now = new Date().toISOString();
  let post = {
    title: data.title,
    content: data.content,
    createdAt: now,
  };

  return create(post);
}

export function updatePost(id, data) {
  const updatedPost = update(id, data);
  if (updatedPost) return updatedPost;
  else {
    const error = new Error(`Cannot find post with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export function deletePost(id) {
  const result = remove(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find post with id ${id}`);
    error.status = 404;
    throw error;
  }
}
