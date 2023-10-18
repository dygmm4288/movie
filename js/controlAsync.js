export function getMovies(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmNiMjlkMmVlNjdlYTA4YmViOGNmYTZjNDgwN2U5ZiIsInN1YiI6IjYzMjZmY2E1YmJkMGIwMDA3YWIyZDFhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1okNPsyrlmf3E4dvehvoe3NQNwMf_gROe3HaFYivZqk',
    },
  });
}
