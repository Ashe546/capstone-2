/* eslint-disable */
import userReservationList from '../src/reservationCounter';
import involvement from '../__MOCK__/involvement';

describe('check result equal to number of DOM elemens', () => {
  test('', async () => {
    const reservation = await userReservationList(1);

    expect(reservation).toBe(2);
  });
});
