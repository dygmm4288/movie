import { createMovieItem } from './controlDom.js';
import { append, select } from './util.js';

const serachInput = select('#search-bar-input');
serachInput.focus();

export function searchMovie(movies) {
  return (value) => {
    const lowerValue = value.toLowerCase();
    return movies.filter((movie) => movie.title.toLowerCase().indexOf(lowerValue) !== -1);
  };
}

export function submitSearchEvent(movies) {
  return (e) => {
    e.preventDefault();
    const value = e.target.querySelector('input').value;
    const nextMovies = value ? searchMovie(movies)(value) : movies;
    const moviesWrapperUl = select('#movies-wrapper');

    moviesWrapperUl.innerHTML = '';
    append(moviesWrapperUl, nextMovies.map(createMovieItem));
    serachInput.focus();
  };
}
