import { makeId, map, selectAll } from './util.js';
class CircleItem {
  constructor(element, radius) {
    this._element = element;
    this._radius = radius;
  }
  updateTransform(angle) {
    const style = getComputedStyle(this._element);
    const getSize = (x) => Number(x.slice(0, -2));
    const getPosition = (circleFunc) => (x) => Math.round(circleFunc(degreesToRadians(angle)) * Math.floor(this._radius / 2)) - Math.floor(x / 2);
    const [width, height] = [style.width, style.height].map(getSize);
    const [x, y] = [
      [width, Math.cos],
      [height, Math.sin],
    ].map((v) => getPosition(v[1])(v[0]));
    this._element.style.transform = `translate(${x}px, ${y}px)`;
  }
}
class CircleContainer {
  constructor(circleItems, angles, radius, id) {
    this._circleItems = map(circleItems, (v) => new CircleItem(v, radius));
    this._angles = angles;
    this._radius = radius;
    this._interval = null;
    this._speed = 20;
    this._id = id;
  }
  set speed(value) {
    return (this._spped = value);
  }
  rotate() {
    this._circleItems.forEach((circleItem, i) => {
      circleItem.updateTransform(this._angles[i]);
      this._angles[i] += 1;
    });
  }
  playRotate(speed) {
    this._interval = setInterval(() => {
      this.rotate();
    }, speed || this._speed);
  }
  stopRotate() {
    if (this._interval === null) return;
    clearInterval(this._interval);
  }
}
const movieItemDivs = selectAll('.movie-item div');

const angles = [0, 90, 180, 270];
const circleContainer = new CircleContainer(movieItemDivs, angles, 600, makeId.next().value);
circleContainer.playRotate();
movieItemDivs.forEach((v) => {
  v.dataset.circleId = circleContainer._id;
  v.addEventListener('mouseenter', (e) => {
    circleContainer.stopRotate();
  });
  v.addEventListener('mouseleave', (e) => circleContainer.playRotate());
});

function degreesToRadians(degrees) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}
