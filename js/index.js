import { getMovies } from './controlAsync.js';
import { createMovieItem } from './controlDom.js';
import { submitSearchEvent } from './search.js';
import { append, select } from './util.js';

let movies = await getMovies('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1')
  .then((res) => res.json())
  .then((data) => {
    const moviesWrapperUl = select('#movies-wrapper');
    moviesWrapperUl.innerHTML = '';

    append(
      moviesWrapperUl,
      data.results.map((movieInfo) => createMovieItem(movieInfo)),
    );

    const searchForm = select('#search-bar-form');
    searchForm.addEventListener('submit', submitSearchEvent(data.results));
    return data.results;
  });
