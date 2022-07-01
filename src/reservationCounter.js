
import involvement from '../__MOCK__/involvement.js';

const userReservationList = (id) => {
  let reservationInnerText = '';
  let counter = 0;
  involvement.getCustomData(`/reservations?item_id=${id}`).then((res) => {
    console.log(res);
    res.forEach((user) => {
      counter += 1;
      reservationInnerText += `<p>${user.date_start} - ${user.date_end} by ${user.username}</p>`;
    });
    return counter
    console.log(typeof(counter));
    console.log(counter)
    const scroll = document.createElement('div');
    scroll.className = 'scroll';
    scroll.innerHTML = reservationInnerText;

    const reservationDiv = document.querySelector('#reservationDiv');
    reservationDiv.innerHTML = `Reservation(${counter})`;
    reservationDiv.appendChild(scroll);
  });
};

export default userReservationList;
