import './css/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

import renderFooter from './modules/footer.js';
import getMovies from './modules/movie_list.js';
import renderReservation from './modules/reservation.js';

const request = 'comedy';
// const url = `https://api.tvmaze.com/search/shows?q=${movie}`;

renderFooter();

const displayMovies = document.querySelector('#display-movies');

const popupMovieDetail = async (id) => {
  const movies = await getMovies(request);
  const detailPopup = document.createElement('div');
  detailPopup.className = 'popup';
  movies.forEach((movie) => {
    if (id === movie.show.id) {
      const movieItem = document.createElement('div');
      movieItem.className = 'movie-item';
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
      movieItem.append(movieName, movieImage, movieStatus, moviePremiered, closeButton);
      const commentHeader = document.createElement('h2');
      commentHeader.innerHTML = 'Comments';
      const commentList = document.createElement('ul');
      document.body.append(detailPopup);
      if (comments.length > 0) {
        comments.forEach((comment) => {
          const singleComment = document.createElement('li');
          singleComment.innerHTML = `${comment.creation_date} ${comment.username} : ${comment.comment}`;
          commentList.append(singleComment);
        });
      }
      detailPopup.append(movieItem, commentHeader, commentList);

      closeButton.addEventListener('click', () => {
        document.body.removeChild(detailPopup);
        document.body.style.overflow = 'auto';
      });
    }
  });
};

const display = async () => {
  const movies = await getMovies(request);
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

    const reservationButton = document.createElement('button');
    reservationButton.className = 'btn';
    reservationButton.innerHTML = 'reservation';

    movieList.append(movieName, movieImage, commentButton, reservationButton);

    commentButton.addEventListener('click', () => {
      popupMovieDetail(movie.show.id);
      document.body.style.overflow = 'hidden';
    });

    reservationButton.addEventListener('click', () => {
      renderReservation(movie.show.id);
      // console.log(movie.show.id);
    });
  });
};

display();
