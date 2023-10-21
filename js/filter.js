const set = new Set();

const obj = {
  name: 'lee',
  age: 20,
};
const obj2 = { ...obj };

const arr = [obj, obj2];

set.add(obj);
set.add(obj);
console.log(set);
