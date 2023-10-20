import { CircleContainer } from './circle.js';
import { getMovies } from './controlAsync.js';
import { createMovieItem } from './controlDom.js';
import { submitSearchEvent } from './search.js';
import { append, makeIdGenerator, select } from './util.js';
(async function () {
  let [movies, circleContainers] = await getMovies('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1')
    .then((res) => res.json())
    .then((data) => {
      return [data.results, renderMovies(data.results)];
    });
  console.log(movies);
  const searchForm = select('#search-bar-form');
  const searchInput = select('#search-bar-input');
  searchInput.focus();
  searchForm.addEventListener('submit', submitSearchEvent(movies, circleContainers));
  searchInput.addEventListener('keyup', submitSearchEvent(movies, circleContainers));
})();
export function renderMovies(movies) {
  const moviesWrapperUl = select('#movies-wrapper');
  moviesWrapperUl.innerHTML = '';
  const makeId = makeIdGenerator();

  // 5개씩 잘라서
  // 최소 radius 600 + 200씩 늘린다?
  const size = Math.max(1, Math.floor(movies.length / 4));
  const circleContainers = [];
  console.log(movies);
  for (let i = 0, len = movies.length; i < len; i += size) {
    const movieItems = [];
    for (let j = 0; j < size; j++) {
      if (i + j < len) {
        movieItems.push(movies[i + j]);
      }
    }
    const id = makeId.next().value;
    const circleItems = createMovieItem(id, movieItems);
    const zIndex = size - id;
    circleItems.style.zIndex = zIndex;

    append(moviesWrapperUl, circleItems);

    const index = Math.floor(i / size);
    const startAngle = index % 2 === 0 ? 0 : 45;
    const radius = 600 + 200 * index;
    const speed = Math.random() * 21;
    const circleContainer = new CircleContainer(Array.prototype.slice.call(circleItems.children), radius, id, startAngle, circleItems, zIndex);
    circleContainer.speed = speed;

    circleItems.style.width = radius + 'px';
    circleItems.style.height = radius + 'px';

    console.log(circleContainer);

    circleContainer.playRotate();
    circleContainers.push(circleContainer);
  }
  return circleContainers;
}
