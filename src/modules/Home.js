// hompage

import renderReservation from './reservation.js';
import getMovies from './movie_list.js';
import popupMovieDetail from './comments.js';

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
  return (await result).json;
};

//get the likes
export async function getLikes(id) {
  const response = await fetch(`${likeUrl}?item_id=${id}`);
  const result = await response.json();
  return result;
}

//update the likes
export const likeClick = async (id) => {
  const likes = await getLikes(id);
  const test = likes.filter(like => like.item_id === id)
  console.log(test[0].likes)
  console.log(likes)
  if(test.length === 0){
    likeCounter(id)
  }else{
    test[0].likes === 2
  }
}

const component = async () => {
  const movies = await getMovies(request);
  const Home = document.querySelector('#row');
  movies.forEach((movie) => {
    const element = document.createElement('div');
    element.className = 'col-3 home-col';
    element.innerHTML += `<div class="row" style="height: 50%; background-color:azure align-items: center; justify-content: center;">
        <img style ="height: 100%; width: auto;" src=${movie.show.image.medium} alt="img"></div>
        <div class="row"><h1>${movie.show.name}</h1></div>`;


        const iconBtn = document.createElement('button')
        iconBtn.type = 'button'; 
        iconBtn.innerHTML += 'like';

    const commentButton = document.createElement('button');
    commentButton.type = 'button';
    commentButton.className = 'comment';
    commentButton.innerHTML += 'comment';
    const reservationButton = document.createElement('button');
    reservationButton.className = 'btn';
    reservationButton.innerHTML = 'reservation';
    element.append(iconBtn, commentButton, reservationButton);

    reservationButton.addEventListener('click', () => {
      renderReservation(movie.show.id);
      console.log(movie.show.id);
    });

    iconBtn.addEventListener('click', () => {
      likeClick(movie.show.id);
    });


    commentButton.addEventListener('click', () => {
      popupMovieDetail(movie.show.id);
      document.body.style.overflow = 'hidden';
    });
    Home.appendChild(element);
  });
};


export default component;