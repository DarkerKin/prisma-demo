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
      createdAt:true,
      category:true
    },
    orderBy:{[filter.sortBy]:filter.sortOrder},
    take: filter.limit,
    skip: filter.offset,
  });
  return result;
}

export async function getById(id) {
  let post = await prisma.post.findUnique({
    where:{id},
    select:{
      id:true,
      title:true,
      createdAt:true,
      content:true,
      category:true
    }
  })
  return post;
}

export async function create(post) {
  const newPost = await prisma.post.create({
    data:post,
    include: {category:true}
  })
  return newPost;
}

export async function update(id, updates) {
  try{
    const updatedPost = await prisma.post.update({
    where:{id},
    data: updates,
    include:{category:true}
  })
  return updatedPost
  }catch(error){
    if (error.code === 'P2025') return null;
  }
  
}

export async function remove(id) {
  try{
    const deletePost = await prisma.post.delete({where:{id}})
    return deletePost;
  }
  catch(error){
    if (error.code === 'P2025') return null;
  }
  
}
