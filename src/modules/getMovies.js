const movie = 'comedy';
const url = `https://api.tvmaze.com/search/shows?q=${movie}`;
async function getMovies() {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export default getMovies;