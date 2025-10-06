import { categories, getNextId } from '../db/categories.js';

export function getAll(query) {
  let result = [...categories];
  return result;
}

export function getById(id) {
  let category = categories.find((category) => c.id === id);
  return category;
}

export function create(category) {
  let id = getNextId();
  const newCategory = { id, name: category.name };
  categories.push(newCategory);
  return newCategory;
}

export function update(id, updates) {
  console.log(id);
  const index = categories.findIndex((category) => category.id === id);
  if (index !== -1) {
    categories[index].name = updates.name;
    return categories[index];
  } else {
    return null;
  }
}

export function remove(id) {
  const index = categories.findIndex((category) => category.id === id);
  if (index !== -1) {
    categories.splice(index, 1);
    return true;
  } else {
    return false;
  }
}
