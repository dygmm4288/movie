import { getMovies } from './controlAsync.js';
import { createMovieItem } from './controlDom.js';
import { append, select } from './util.js';
getMovies('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1')
  .then((res) => res.json())
  .then((data) => {
    const movies = data.results;
    const moviesWrapperUl = select('#movies-wrapper');
    append(
      moviesWrapperUl,
      movies.map((movieInfo) => createMovieItem(movieInfo)),
    );
  });
