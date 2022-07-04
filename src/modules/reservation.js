import getMovies from './movie_list.js';
import close from '../img/close_white.png';
import { involvement } from './involvement.js';

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

const counter = async (id) => {
  const reservationInnerText = '';
  let counter = 0;
  await involvement.getCustomData(`/reservations?item_id=${id}`).then((res) => {
    res.forEach((user) => {
      counter += 1;
    });
  });
  return counter
};

const userReservationList = async (id) => {
  const reservationDiv = document.querySelector('#reservationDiv');
  const reverse = document.querySelector('div');
  reverse.className = 'reverse';
  const scroll = document.createElement('div');
  scroll.className = 'scroll';
  let reservationInnerText = '';
  involvement.getCustomData(`/reservations?item_id=${id}`).then((res) => {
    res.forEach((user) => {
      reservationInnerText += `<p>${user.date_start} - ${user.date_end} by ${user.username}</p>`;
    });
  });
  const setCounter = await counter(id);
  reservationDiv.innerHTML = `Reservation(${setCounter})`;
  reverse.innerHTML = reservationInnerText;
  reservationDiv.appendChild(scroll);
  scroll.appendChild(reverse);
};

const renderReservation = async (id) => {
  const movie = await getMovies(id);
  const popup = document.createElement('div');
  popup.className = 'popupModal';
  reservation = `
    <div class="popupContent">
      <div class = 'close-icon'><img id="close" src="${close}"></div>
      <div class = "reservation-wraper">
      <div id="description">
      <img id="snapshot" src="${movie.image.medium}">
      <h3>${movie.name}</h3>
      <p class="paragraph">Language: ${movie.language}</p>
      <p class="paragraph">Status: ${movie.status}</p>
      <p class="paragraph">Premiered : ${movie.premiered}</p>
      </div>

      <div>
      <div class="schedule">Schedule:
        <p class="paragraph">Days: ${movie.schedule.days}</p>
        <p class="paragraph">Time: ${movie.schedule.time}</p>
      </div>

      <div id="reservationDiv"></div>
      <div class = 'reservationForm'> Add a reservation
        <label for="name">Name: <input id="name" class="white" type="text" name="name" value="" placeholder="Your name"></label>
        <label for="start">Start date: <input id="start" type="date" name="date" value="" placeholder="Start date"></label>
        <label for="end">End date: <input id="end" type="date" name="date" value="" placeholder="End date"></label>
        <button id="reservationButton" type="button" name="button">Reserve</button>
      </div>
      </div>
      </div>
  </div>`;

  popup.innerHTML = reservation;
  content.appendChild(popup);
  const Home = document.querySelector('#row');
  const closeButton = document.getElementById('close');
  content.style.overflow = 'hidden';
  closeButton.addEventListener('click', () => {
    content.style.overflow = 'scroll';
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

    userReservationList(id);
  });
  userReservationList(id);
};

export { userReservationList, renderReservation, counter };
