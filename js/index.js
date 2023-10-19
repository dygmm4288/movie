import { CircleContainer } from './circle.js';
import { getMovies } from './controlAsync.js';
import { createMovieItem } from './controlDom.js';
import { append, makeId, select } from './util.js';
getMovies('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1')
  .then((res) => res.json())
  .then((data) => {
    const moviesWrapperUl = select('#movies-wrapper');
    moviesWrapperUl.innerHTML = '';
    const movies = data.results;

    // 5개씩 잘라서
    // 최소 radius 600 + 200씩 늘린다?
    const size = Math.floor(movies.length / 4);
    const circleContainers = [];
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

    const searchForm = select('#search-bar-form');
    // searchForm.addEventListener('submit', submitSearchEvent(movies));
    return data.results;
  });
