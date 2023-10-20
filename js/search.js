import { renderMovies } from './index.js';

export function searchMovie(movies) {
  return (value) => {
    const lowerValue = value.toLowerCase();
    return movies.filter((movie) => movie.title.toLowerCase().indexOf(lowerValue) !== -1);
  };
}

export function submitSearchEvent(movies, circleContainers) {
  return (e) => {
    e.preventDefault();
    const value = e.target.querySelector('input')?.value || e.currentTarget.value;
    const nextMovies = value ? searchMovie(movies)(value) : movies;
    circleContainers.forEach((circleContainer) => circleContainer.delete());
    console.log({ movies, circleContainers, value, nextMovies });

    circleContainers = renderMovies(nextMovies);
    serachInput.focus();
  };
}
