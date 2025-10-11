import { categories, getNextId } from '../db/categories.js';
import prisma from '../config/db.js';

export async function getAll(query) {
  let result = await prisma.category.findMany({
    select:{
      id:true,
      name:true
    }
  })
  return result;
}

export async function getById(id) {
  let category = await prisma.category.findUnique({
    where:{id},
    select:{
      id:true,
      name:true
    }
  })
  return category;
}

export async function create(category) {
  const newCategory = await prisma.category.create({
    data:category,
  });
  return newCategory;
}

export async function update(id, updates) {
  try{
    const updateCategory = await prisma.category.update({
      where:{id},
      data:updates,
    })
    return updateCategory;
  }catch(err){
    if(err.code === "P2025") return null
  }
}

export async function remove(id) {
  try{
    const deleteCategory = await prisma.category.delete({where:{id}})
    return deleteCategory;
  }
  catch(error){
    if (error.code === 'P2025') return null;
  }
}

export async function exists(id){
  const result = await prisma.category.count({where:{id}});
  return result>0;
}

export async function categoryNameExists(categoryName){
  const result = await prisma.category.count({where:{name:{contains:categoryName}}});
  return result > 0;
}