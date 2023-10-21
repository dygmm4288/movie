export function select(selector) {
  return document.querySelector(selector);
}
export function selectAll(selector) {
  return document.querySelectorAll(selector);
}
export function create(tag, className, idName) {
  const result = document.createElement(tag);
  if (className) result.classList.add(...className.split(' '));
  if (idName) result.id = idName;
  return result;
}
export function append(parent, childs) {
  if (Array.isArray(childs)) {
    childs.forEach((child) => parent.appendChild(child));
    return parent;
  }
  parent.appendChild(childs);
  return parent;
}
export function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
export function map(arr, iteratee) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(iteratee(arr[i], i, arr));
  }
  return result;
}

export const makeIdGenerator = function* () {
  let id = 0;
  while (true) {
    yield id++;
  }
};
