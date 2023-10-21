import { getMovies } from './controlAsync.js';
import { append, create, select, setAttribute } from './util.js';

let interval;

export const createMovieItem = (id, moviesInfo) => {
  const movieLi = create('li');

  /* 영화 wrapper */
  movieLi.dataset.id = id;
  movieLi.classList.add('movie-item');
  return append(movieLi, moviesInfo.map(createMovieItemCircle));
};
export const createMovieOtherInfoElement = (info) => {
  const result = info.map(({ title, desc }) => {
    const otherInfoItemLi = create('li');
    const titleSpan = create('span');
    const descSpan = create('span');

    titleSpan.innerText = title;
    descSpan.innerText = desc;

    titleSpan.classList.add('title');
    titleSpan.classList.add('desc');

    return append(otherInfoItemLi, [titleSpan, descSpan]);
  });
  return result;
};

export const createMovieItemCircle = (movieInfo) => {
  const { title, id, overview, poster_path, vote_average, original_title } =
    movieInfo;
  const movieCircleDiv = create('div'); // document.createElement('div')
  const movieInfoDiv = create('div');
  const movieImg = create('img');
  const movieHeading = create('h3');
  const descWrapperDiv = create('div');
  const descDescCoverDiv = create('div');
  const descP = create('p');
  const otherInfoUl = create('ul');

  movieCircleDiv.classList.add('movie-circle');
  const movieThumbDiv = create('div');
  const movieCircleImg = create('img');

  movieInfoDiv.classList.add('movie-info');

  movieThumbDiv.classList.add('movie-thumb');
  movieCircleImg.classList.add('movie-circle-img');

  movieImg.classList.add('movie-img');
  // 이미지 소스 및 alt넣기
  [movieImg, movieCircleImg].map((el) =>
    setAttribute(el, {
      src: 'https://image.tmdb.org/t/p/w500' + poster_path,
      alt: original_title,
    }),
  );
  movieHeading.classList.add('movie-heading');
  movieHeading.innerText = title;

  /* 영화 내용 */
  descP.classList.add('movie-desc');
  descP.innerText = overview;

  descWrapperDiv.classList.add('movie-desc-wrapper');
  descDescCoverDiv.classList.add('movie-desc-cover');
  append(descWrapperDiv, [descP, descDescCoverDiv]);

  /* 영화 다른 내용 */
  otherInfoUl.classList.add('other-info-list');

  /* 엘리먼트 안에 엘리먼트 넣기 */
  append(
    otherInfoUl,
    createMovieOtherInfoElement([
      {
        title: '영화 평점',
        desc: vote_average,
      },
    ]),
  );
  // 이 부분이 좀 많이 걸리네...
  movieCircleDiv.addEventListener('click', (e) => {
    const $modalDetail = select('#modal-wrapper .movie-detail');
    const $modal = select('#modal-wrapper #modal-content');
    $modal.style.width = '1982px';
    $modal.style.height = '1080px';
    $modal.style.zIndex = 200;
    $modalDetail.innerHTML = '';
    createMovieDetail(id).then((response) => {
      const $movieDetailContainer = append($modalDetail, response);
    });

    createBackdropPoster(id).then((response) => {
      const $movieBackPosterContainer = append($modalDetail, response);
      const $li = Array.prototype.slice.call(
        $movieBackPosterContainer.querySelectorAll('li'),
      );
      console.log(
        $movieBackPosterContainer,
        $movieBackPosterContainer.querySelectorAll('li'),
      );
      $li[0].style.opacity = 1;
      let size = $li.length;
      let curIndex = 1;
      console.log({ $li, size, curIndex });
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        const nextIndex = (curIndex + 1) % size;
        $li[nextIndex].style.opacity = 1;
        $li[curIndex].style.opacity = 0;
        curIndex = nextIndex;
      }, 5000);
    });
  });

  return append(movieCircleDiv, [
    append(movieThumbDiv, movieCircleImg),
    append(movieInfoDiv, [movieImg, movieHeading, descWrapperDiv, otherInfoUl]),
  ]);
};

function createGenreElement(name) {
  const $genre = create('p', 'movie-other-info');
  $genre.innerText = '#' + name;
  return $genre;
}

async function createBackdropPoster(id) {
  const backdrops = await getMovies(
    `https://api.themoviedb.org/3/movie/${id}/images`,
  )
    .then((response) => response.json())
    .then(({ backdrops }) => backdrops.map((v) => v.file_path));
  const $movieBackPosterContainer = create('ul', 'poster-container');
  const $movieBackPosterItems = backdrops.map((path) => {
    const el = create('li', 'poster-item');
    el.style.backgroundImage = `url("${
      'https://image.tmdb.org/t/p/original' + path
    }")`;
    return el;
  });
  return append($movieBackPosterContainer, $movieBackPosterItems);
}

async function createMovieDetail(id) {
  const { title, overview, vote_average, release_date, genres } =
    await getMovies(
      `https://api.themoviedb.org/3/movie/${id}?language=ko`,
    ).then((response) => response.json());

  const $movieDetailContainer = create('section', 'movie-detail-container');
  const $movieTitle = create('h1', 'movie-detail-title');
  const $movieOtherInfoContainer = create('div', 'movie-otherinfo-container');
  const $movieReleaseDate = create('span', 'movie-other-info');
  const $movieVoteAverage = create('span', 'movie-other-info');
  const $movieOverviewHeading = create('h3', 'movie-heading');
  const $movieOverview = create('p', 'movie-overview');

  append($movieOtherInfoContainer, [
    ...genres.map(({ name }) => createGenreElement(name)),
    $movieReleaseDate,
    $movieVoteAverage,
  ]);

  /* Fill Content */
  $movieTitle.innerText = title;
  $movieReleaseDate.innerText = release_date.slice(0, 4);
  $movieVoteAverage.innerText = vote_average.toFixed(1);
  $movieOverviewHeading.innerText = 'Overview';
  $movieOverview.innerText = overview;

  return append($movieDetailContainer, [
    $movieTitle,
    $movieOtherInfoContainer,
    $movieOverviewHeading,
    $movieOverview,
  ]);
}
