import './css/style.css';

const movie = 'comedy';
const url = `https://api.tvmaze.com/search/shows?q=${movie}`;

const displayMovies = document.querySelector('#display-movies');
export async function getMovies() {
  const response = await fetch(new Request(url));
  const result = await response.json();
  return result;
}

export const popupMovieDetail = async (id) => {
  const movies = await getMovies();
  const detailPopup = document.createElement('div');
  detailPopup.className = 'popup';
  movies.forEach((movie) => {
    if (id === movie.show.id) {
      const movieName = document.createElement('lable');
      movieName.innerHTML += `${movie.show.name}`;
      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.innerHTML = 'close';
      const movieStatus = document.createElement('lable');
      movieStatus.innerHTML += `Status : ${movie.show.status}`;
      const moviePremiered = document.createElement('lable');
      moviePremiered.innerHTML += `Premiered : ${movie.show.premiered}`;
      const movieImage = document.createElement('img');
      movieImage.src = movie.show.image.medium;
      detailPopup.append(movieName, movieImage, movieStatus, moviePremiered, closeButton);
      document.body.append(detailPopup);

      closeButton.addEventListener('click', () => {
        document.body.removeChild(detailPopup);
      });
    }
  });
};

export const display = async () => {
  const movies = await getMovies();
  movies.forEach((movie) => {
    const movieList = document.createElement('div');
    movieList.className = 'movie-list';
    displayMovies.append(movieList);
    const movieName = document.createElement('lable');
    movieName.innerHTML += `${movie.show.name}`;
    const movieImage = document.createElement('img');
    movieImage.src = movie.show.image.medium;
    const commentButton = document.createElement('button');
    commentButton.type = 'button';
    commentButton.className = 'comment';
    commentButton.innerHTML += 'comment';
    movieList.append(movieName, movieImage, commentButton);

    commentButton.addEventListener('click', () => {
      popupMovieDetail(movie.show.id);
    });
  });
};

display();
