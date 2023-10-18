export function select(selector) {
  return document.querySelector(selector);
}
export function selectAll(selector) {
  return document.querySelectorAll(selector);
}
export function create(tag) {
  return document.createElement(tag);
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
