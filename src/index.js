import './css/style.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

import renderFooter from './modules/footer.js';
// import getMovies from './modules/movie_list.js';
// import renderReservation from './modules/reservation.js';

import component from './modules/Home';

// const request = 'comedy';
// const url = `https://api.tvmaze.com/search/shows?q=${movie}`;

renderFooter();

// const displayMovies = document.querySelector('#display-movies');

// const Home = document.querySelector('#row');

component();
