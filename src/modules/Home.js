// hompage 

import renderReservation from './reservation.js';
import getMovies from './movie_list.js';
import popupMovieDetail from './comments.js';

const request = 'comedy';


const component =  async() => {
  const movies = await getMovies(request);
  const Home = document.querySelector('#row')
  movies.forEach((movie) => {
    const element = document.createElement('div');
    element.className = 'col-3 home-col';
      element.innerHTML += `<div class="row" style="height: 50%; background-color:azure align-items: center; justify-content: center;">
        <img style ="height: 100%; width: auto;" src=${movie.show.image.medium} alt="img"></div>
        <div class="row"><h1>${movie.show.name}<i>heart</i></h1></div>`
            const commentButton = document.createElement('button');
            commentButton.type = 'button';
            commentButton.className = 'comment';
            commentButton.innerHTML += 'comment';
            const reservationButton = document.createElement('button');
            reservationButton.className = 'btn';
            reservationButton.innerHTML = 'reservation';  
            element.append(commentButton, reservationButton)

                reservationButton.addEventListener('click', () => {
                renderReservation(movie.show.id);
               console.log(movie.show.id);
          });

              commentButton.addEventListener('click', () => {
      popupMovieDetail(movie.show.id);
      document.body.style.overflow = 'hidden';
    });
          Home.appendChild(element)
        })   
  };
  export { component };