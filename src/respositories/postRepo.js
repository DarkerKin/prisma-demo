import { posts, getNextId } from '../db/posts.js';
import prisma from '../config/db.js';

export async function getAll(filter) {
  const conditions = {}
  if(filter.categoryId){
    conditions.categoryId = {equals:parseInt(filter.categoryId)}
  }
  if(filter.search){
    conditions.OR = [
      {title: {contains: filter.search, mode: 'insensitive'}},
      {content: {contains: filter.search, mode: 'insensitive'}}
    ]
  }
  let result = await prisma.post.findMany({
    where:conditions,
    select:{
      id:true,
      title:true,
      content:true,
      category:true
    }
  });
  return result;
}

export async function getById(id) {
  let post = await prisma.post.findUnique({
    where:{id},
    select:{
      id:true,
      title:true,
      content:true,
      category:{
        select:{name:true}
      }
    }
  })
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
