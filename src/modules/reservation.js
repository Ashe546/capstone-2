import getMovies from './movie_list.js';
import close from '../img/close.png';
import involvement from './involvement.js';

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
  // this block has other possibilities
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
  // const reservationData = involvement.getCustomData(`/reservations?item_id=${id}`);
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
      <div id="reservationDiv"></div>
      <div> Add a reservation
        <input id="name" type="text" name="name" value="" placeholder="Your name">
        <input id="start" type="date" name="date" value="" placeholder="Start date">
        <input id="end" type="date" name="date" value="" placeholder="End date">
        <button id="reservationButton" type="button" name="button"></button>
      </div>
  </div>`;
  popup.innerHTML = reservation;
  content.appendChild(popup);
  const closeButton = document.getElementById('close');
  closeButton.addEventListener('click', () => {
    closeButton.parentElement.parentElement.remove();
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

export default renderReservation;

// OR

/*

  involvement.postCustomData(object, `/reservations/`);
  involvement.getCustomData(`/reservations?item_id=${id}`).then(res => {
    if (Array.isArray(res)) {
      console.log(res);  // or whatever else you want to do with the data
    }
  });

  */
