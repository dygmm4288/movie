import { append, create, setAttribute } from './util.js';

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
  const { title, id, overview, poster_path, vote_average, original_title } = movieInfo;
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

  movieCircleDiv.addEventListener('click', () => {
    alert(id);
  });

  return append(movieCircleDiv, [append(movieThumbDiv, movieCircleImg), append(movieInfoDiv, [movieImg, movieHeading, descWrapperDiv, otherInfoUl])]);
};
