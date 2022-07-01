// hompage
/* eslint-disable */
import { renderReservation } from './reservation.js';
import getMovies from './movie_list.js';
import popupMovieDetail from './comments.js';
import heart from '../img/like1.png';
import heart1 from '../img/like2.png';
import movieCounter from './moviecounter.js';

const request = 'comedy';
const appId = 'Dk9UnpgPWAMDZ19Gse0r';
const likeUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes`;


// If there was no like adds a like
export const likeCounter = async (id) => {
  const like = 0;
  const result = fetch(likeUrl, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      like: 1
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  console.log(result.json)
  return (await result).json;
};


//get the likes
export async function getLikes(id) {
  const response = await fetch(`${likeUrl}?item_id=${id}`);
  const result = await response.json();
  return result;
}


const component = async (id) => {
  const movies = await getMovies(request);
  const count = movieCounter(movies);
  const movie = document.querySelector('.movie')
movie.innerHTML = `movie (${count - 5})`
  console.log(movies)
  const likes = await getLikes(id);
  const Home = document.querySelector('#row');
  movies.forEach((movie) => {
    const element = document.createElement('div');
    element.className = 'home-col col-2';
    element.innerHTML += `
        <img style ="height: 310px; width: auto;" src=${movie.show.image.medium} alt="img">
        <div class="row name-div"><h5 class = 'names'>${movie.show.name}</h5></div>`;

        const test = likes.filter(like => like.item_id === movie.show.id)

        const icon = document.createElement('p');
        icon.className = 'icon';


        if(test.length === 0){
          icon.innerHTML = `0`
        }else{
          icon.innerHTML = `${test[0].likes}`
        }

        const iconBtn = document.createElement('button')
        iconBtn.type = 'button';
        iconBtn.className = "icon-btn"
        iconBtn.innerHTML = `<img src="${heart}">`;

    const commentButton = document.createElement('button');
    commentButton.type = 'button';
    commentButton.className = 'comment';
    commentButton.innerHTML += `<p>Comment<p>`;
    const reservationButton = document.createElement('button');
    reservationButton.type = 'button';
    reservationButton.className = 'reservation';
    reservationButton.innerHTML = `<p>Reservation<p>`;
    element.append(icon ,iconBtn, commentButton, reservationButton);

    reservationButton.addEventListener('click', () => {
      renderReservation(movie.show.id);
      Home.classList.add('blur');
    });

    iconBtn.addEventListener('click', () => {
      likeCounter(movie.show.id);
      if(iconBtn.innerHTML === `<img src="${heart}">`){
        iconBtn.innerHTML = `<img src="${heart1}">`
        icon.innerHTML = `${test[0].likes + 1}`
      }else{
        iconBtn.innerHTML = `<img src="${heart}">`
        icon.innerHTML = `${test[0].likes}`
      }
    });


    commentButton.addEventListener('click', () => {
      popupMovieDetail(movie.show.id);
      document.body.style.overflow = 'hidden';
    });
    Home.appendChild(element);
  });
};

export default component;
