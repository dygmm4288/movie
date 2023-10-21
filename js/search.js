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
    const searchInput = e.target.querySelector('input') || e.currentTarget;
    const value = searchInput.value;
    const nextMovies = value ? searchMovie(movies)(value) : movies;
    circleContainers.forEach((circleContainer) => circleContainer.delete());
    //console.log({ movies, circleContainers, value, nextMovies });

    circleContainers = renderMovies(nextMovies);
    searchInput.focus();
  };
}
function searchMovieWithTrie(trie) {
  return (value) => {
    const lowerValue = value.toLowerCase();
    console.log({ value }, trie.find(lowerValue), trie._root);
    return trie.find(lowerValue);
  };
}

export function searchMovieEvent(trie, circleContainers) {
  return (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector('input') || e.currentTarget;
    const value = searchInput.value;
    // const nextMovies = value ? searchMovieWithTrie(trie)(value) : trie._root._includes;
    const nextMovies = searchMovieWithTrie(trie)(value);
    console.log(nextMovies);
    circleContainers.forEach((circleContainer) => circleContainer.delete());
    circleContainers = renderMovies(nextMovies);
    searchInput.focus();
  };
}
