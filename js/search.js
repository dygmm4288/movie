import { createMovieItem } from './controlDom.js';
import { append, select } from './util.js';

export function searchMovie(movies) {
  return (value) => {
    return movies.filter((movie) => movie.title.indexOf(value) !== -1);
  };
}

export function submitSearchEvent(movies) {
  return (e) => {
    e.preventDefault();
    const value = e.target.querySelector('input').value;
    const nextMovies = value ? searchMovie(movies)(value) : movies;
    const moviesWrapperUl = select('#movies-wrapper');

    moviesWrapperUl.innerHTML = '';
    console.log(nextMovies);
    append(moviesWrapperUl, nextMovies.map(createMovieItem));
  };
}
