import { append, create, setAttribute } from './util';

export const createMovieItem = (movieInfo) => {
  const { title, id, overview, poster_path, vote_average, original_title } = movieInfo;
  const movieLi = create('li');
  const movieImg = create('img');
  const movieHeading = create('h3');
  const descP = create('p');
  const otherInfoUl = create('ul');

  /* 영화 wrapper */
  movieLi.dataset.id = id;

  /*  영화 이미지 */
  movieImg.classList.add('movie-img');
  setAttribute(movieImg, {
    src: poster_path,
    alt: original_title,
  });
  /* 영화 제목 */
  movieHeading.classList.add('movie-heading');
  movieHeading.innerText = title;

  /* 영화 내용 */
  descP.classList.add('movie-desc');
  descP.innerText = overview;

  /* 영화 다른 내용 */
  otherInfoUl.classList.add('other-info-list');
  append(
    otherInfoUl,
    createMovieOtherInfoElement({
      title: '영화 평점',
      desc: vote_average,
    }),
  );

  append(movieLi, [movieImg, movieHeading, descP, otherInfoUl]);
};
export const createMovieOtherInfoElement = (info) => {
  const result = [];
  for (const key in info) {
    const otherInfoItemLi = create('li');
    const titleSpan = create('span');
    const descSpan = create('span');

    titleSpan.innerText = key;
    descSpan.innerText = info[key];

    result.push(append(otherInfoItemLi, [titleSpan, descSpan]));
  }
  return result;
};
