import userReservationList from '../src/reservationCounter';
import involvement from '../__MOCK__/involvement';
// import { renderReservation } from '../src/modules/reservation.js';

describe('check result equal to number of DOM elemens', () => {
  test('', async () => {

    const reservationDiv = document.createElement('div');
    reservationDiv.id = 'reservationDiv';
    document.body.appendChild(reservationDiv);

    let counter = await userReservationList(1);

    expect(reservationDiv.textContent).toBe('Reservation(2)');
    expect(counter).toBe(2);
    expect(scroll.children).toHaveLength(2);
  });
});
