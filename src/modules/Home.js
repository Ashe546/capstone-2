// hompage 

import renderReservation from './reservation.js';
import getMovies from './movie_list.js';


const request = 'comedy';

const appId = 'Dk9UnpgPWAMDZ19Gse0r';
const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`;


export async function getComments(id) {
  const response = await fetch(`${commentUrl}?item_id=${id}`);
  const result = await response.json();
  console.log(result)
  return result;
}




const popupMovieDetail = async (id) => {
  const movies = await getMovies(request);
   const comments = await getComments(id);
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