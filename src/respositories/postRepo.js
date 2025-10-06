import { posts, getNextId } from '../db/posts.js';

export function getAll(query) {
  let result = [...posts];
  if (query.title) {
    result = result.filter((post) =>
      post.title.toLowerCase().includes(query.title),
    );
  }

  return result;
}

export function getById(id) {
  let post = posts.find((b) => b.id === id);
  return post;
}

export function create(post) {
  let id = getNextId();
  const newPost = { id, ...post };
  posts.push(newPost);
  return newPost;
}

export function update(id, updates) {
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    const updatedPost = {
      ...posts[index],
      ...updates,
    };
    posts[index] = updatedPost;
    return posts[index];
  } else {
    return null;
  }
}

export function remove(id) {
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    posts.splice(index, 1);
    return true;
  } else {
    return false;
  }
}
