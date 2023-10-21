import { CircleContainer } from './circle.js';
import { getMovies } from './controlAsync.js';
import { createMovieItem } from './controlDom.js';
import { searchMovieEvent, submitSearchEvent } from './search.js';
import { Trie } from './trie.js';
import { append, makeIdGenerator, select } from './util.js';
(async function () {
  let [movies, circleContainers, moviesTrie] = await getMovies(
    'https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1',
  )
    .then((res) => res.json())
    .then((data) => {
      const trie = new Trie();

      data.results.forEach((v) => {
        const lowerTitle = v.title.toLowerCase().replace(' ', '');
        for (let i = 0, len = lowerTitle.length; i < len; i++) {
          trie.push(lowerTitle.slice(i), v);
        }
      });
      return [data.results, renderMovies(data.results), trie];
    });

  const searchForm = select('#search-bar-form');
  const searchInput = select('#search-bar-input');
  const modalContent = select('#modal-wrapper #modal-content');
  const modalDetail = select('#modal-wrapper .movie-detail');
  const closeBtn = select('#modal-wrapper .control-wrapper button');
  closeBtn.addEventListener('click', () => {
    modalDetail.innerHTML = '';
    modalContent.style.width = 0;
    modalContent.style.height = 0;
  });
  searchInput.focus();
  searchForm.addEventListener(
    'submit',
    submitSearchEvent(movies, circleContainers),
  );
  searchInput.addEventListener(
    'keyup',
    searchMovieEvent(moviesTrie, circleContainers),
  );
})();
export function renderMovies(movies) {
  const moviesWrapperUl = select('#movies-wrapper');
  moviesWrapperUl.innerHTML = '';
  const makeId = makeIdGenerator();

  // 5개씩 잘라서
  // 최소 radius 600 + 200씩 늘린다?
  const size = Math.max(1, Math.floor(movies.length / 4));
  const circleContainers = [];
  // console.log(movies);
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
    const circleContainer = new CircleContainer(
      Array.prototype.slice.call(circleItems.children),
      radius,
      id,
      startAngle,
      circleItems,
      zIndex,
    );
    circleContainer.speed = speed;

    circleItems.style.width = radius + 'px';
    circleItems.style.height = radius + 'px';

    // console.log(circleContainer);

    circleContainer.playRotate();
    circleContainers.push(circleContainer);
  }
  return circleContainers;
}

function renderDetailMovie() {}
