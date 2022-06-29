import getMovies from './movie_list.js';
import close from '../img/close.png';

const content = document.querySelector('body');

// Render Reservation Popup
let reservation = '';
const renderReservation = async (id) => {
  const movie = await getMovies(id);
  const popup = document.createElement('div');
  popup.className = 'popupModal';
  reservation = `
    <div class="popupContent">
      <img id="close" src="${close}">
      <img src="${movie.image.medium}">
      <h3>${movie.name}</h3>
      <p>Language: ${movie.language}</p>
      <p>Status: ${movie.status}</p>
      <p>Premiered : ${movie.premiered}</p>
      <div>Schedule:
        <p>Days: ${movie.schedule.days}</p>
        <p>Time: ${movie.schedule.time}</p>
      </div>
  </div>`;
  popup.innerHTML = reservation;
  content.appendChild(popup);
  const closeButton = document.getElementById('close');
  closeButton.addEventListener('click', () => {
    closeButton.parentElement.parentElement.remove();
  });
};

export default renderReservation;
