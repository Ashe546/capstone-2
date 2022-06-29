import './css/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

import { popupMovieDetail } from './modules/comments';
import renderFooter from './modules/footer.js';
import getMovies from './modules/movie_list.js';
import renderReservation from './modules/reservation.js';

const request = 'comedy';
// const url = `https://api.tvmaze.com/search/shows?q=${movie}`;

renderFooter();

const displayMovies = document.querySelector('#display-movies');

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
