export const categories = [
  {
    id: 1,
    name: 'Technology',
  },
];
let nextId = categories.length;

export function getNextId() {
  nextId++;
  return nextId;
}
