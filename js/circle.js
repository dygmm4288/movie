import { map } from './util.js';
class CircleItem {
  constructor(element, radius) {
    this._element = element;
    this._radius = radius;
  }
  updateTransform(angle) {
    const style = getComputedStyle(this._element);
    //const getPosition = (circleFunc) => (x) => Math.round(circleFunc(degreesToRadians(angle)) * Math.floor(this._radius / 2)) - Math.floor(x / 2);
    const getPosition = (circleFunc) => (x) => circleFunc(degreesToRadians(angle)) * (this._radius / 2) - x / 2;
    const [width, height] = [style.width, style.height].map(this.getSize);
    const [x, y] = [
      [width, Math.cos],
      [height, Math.sin],
    ].map((v) => getPosition(v[1])(v[0]));
    this.movePosition(x, y);
  }
  movePosition(x, y) {
    this._element.style.transform = `translate(${x}px, ${y}px)`;
  }
  getSize(x) {
    return Number(x.slice(0, -2));
  }
}
export class CircleContainer {
  constructor(circleItems, radius, id, startAngle, containerElement, zIndex) {
    this._circleItems = map(circleItems, (v) => new CircleItem(v, radius));
    this._angles = getAngles(circleItems.length, startAngle);
    this._radius = radius;
    this._interval = null;
    this._speed = 20;
    this._id = id;
    this._containerElement;
    this._zIndex = zIndex;

    this._circleItems.forEach((circleItem, i) => {
      circleItem.updateTransform(this._angles[i]);
      circleItem._element.addEventListener('mouseenter', () => {
        this.stopRotate();
        containerElement.style.zIndex = 100; // 최상위
      });
      circleItem._element.addEventListener('mouseleave', () => {
        this.playRotate();
        containerElement.style.zIndex = this._zIndex;
      });
    });
  }
  set speed(value) {
    return (this._spped = value);
  }
  rotate() {
    this._circleItems.forEach((circleItem, i) => {
      circleItem.updateTransform(this._angles[i]);
      this._angles[i] = (this._angles[i] + 0.5) % 360;
    });
  }
  playRotate(speed) {
    this._interval = setInterval(() => {
      this.rotate();
    }, 20);
  }
  stopRotate() {
    if (this._interval === null) return;
    clearInterval(this._interval);
  }
}

function degreesToRadians(degrees) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}
function getAngles(size, startAngle) {
  const result = [startAngle];
  const delta = Math.floor(360 / size);
  for (let i = 0; i < size - 1; i++) {
    const nextSize = (result[result.length - 1] + delta) % 360;
    result.push(nextSize);
  }
  return result;
}
