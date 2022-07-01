/* eslint-disable */
import involvement from '../__MOCK__/involvement.js';

const userReservationList = async (id) => {
  const reservationInnerText = '';
  let counter = 0;
  await involvement.getCustomData(`/reservations?item_id=${id}`).then((res) => {
    console.log(res);
    res.forEach((user) => {
      counter += 1;
    });
  });
  return counter;
};

export default userReservationList;
