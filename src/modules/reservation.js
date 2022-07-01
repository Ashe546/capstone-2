import getMovies from './movie_list.js';
<<<<<<< HEAD
import close from '../img/close.png';
import { involvement } from './involvement.js';
=======
import close from '../img/cancel2.png';
import involvement from './involvement.js';
>>>>>>> development

const content = document.querySelector('body');

// Render Reservation Popup
let reservation = '';

const createObject = (id) => {
  const name = document.getElementById('name');
  const start = document.getElementById('start');
  const end = document.getElementById('end');
  // Reservation section
  const object = {
    item_id: `${id}`,
    username: name.value,
    date_start: start.value,
    date_end: end.value,
  };

  involvement.postCustomData(object, '/reservations/').then((res) => {
    if (res.ok) {
      involvement.getCustomData(`/reservations?item_id=${id}`).then((res) => res);
    }
  });
};

const userReservationList = (id) => {
  let reservationInnerText = '';
  let counter = 0;
  involvement.getCustomData(`/reservations?item_id=${id}`).then((res) => {
    res.forEach((user) => {
      counter += 1;
      reservationInnerText += `<p>${user.date_start} - ${user.date_end} by ${user.username}</p>`;
    });
    const scroll = document.createElement('div');
    scroll.className = 'scroll';
    scroll.innerHTML = reservationInnerText;
    const reservationDiv = document.querySelector('#reservationDiv');
    reservationDiv.innerHTML = `Reservation(${counter})`;
    reservationDiv.appendChild(scroll);
  });
};

const renderReservation = async (id) => {
  const movie = await getMovies(id);
  const popup = document.createElement('div');
  popup.className = 'popupModal';
  reservation = `
    <div class="popupContent">
      <div class = 'close-icon'><img id="close" src="${close}"></div>
      <div class = "reservation-wraper">
      <div>
      <img src="${movie.image.medium}">
      <h3>${movie.name}</h3>
      <p>Language: ${movie.language}</p>
      <p>Status: ${movie.status}</p>
      <p>Premiered : ${movie.premiered}</p>
      </div>

      <div>
      <div>Schedule:
        <p>Days: ${movie.schedule.days}</p>
        <p>Time: ${movie.schedule.time}</p>
      </div>
  
      <div id="reservationDiv"></div>
      <div class = 'add-reservation-btn'> Add a reservation
        <input id="name" type="text" name="name" value="" placeholder="Your name">
        <input id="start" type="date" name="date" value="" placeholder="Start date">
        <input id="end" type="date" name="date" value="" placeholder="End date">
        <button id="reservationButton" type="button" name="button"></button>
      </div>
      </div>
      </div>
  </div>`;

  popup.innerHTML = reservation;
  content.appendChild(popup);
  const Home = document.querySelector('#row');
  const closeButton = document.getElementById('close');
  closeButton.addEventListener('click', () => {
    document.body.removeChild(popup);
    Home.classList.remove('blur');
  });

  const reservationButton = document.getElementById('reservationButton');
  reservationButton.addEventListener('click', () => {
    const name = document.getElementById('name');
    const start = document.getElementById('start');
    const end = document.getElementById('end');
    createObject(id);
    name.value = '';
    start.value = '';
    end.value = '';
  });
  userReservationList(id);
};

<<<<<<< HEAD
export { userReservationList, renderReservation };
=======
export default renderReservation;
>>>>>>> development
