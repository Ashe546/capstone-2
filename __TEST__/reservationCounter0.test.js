
const userReservationList = async (id) => {
  const result = await fetch(`/reservations?item_id=${id}`)
  .then((res) => {return res});
  }

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve([
      {
        username: 'user1',
        date_start: 'date',
        date_end: 'date',
      },
      {
        username: 'user2',
        date_start: 'date',
        date_end: 'date',
      }
    ])
  })
  );

/*

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve([
    {
      username: 'user1',
      date_start: 'date',
      date_end: 'date',
    },
    {
      username: 'user2',
      date_start: 'date',
      date_end: 'date',
    }
  ])
});
);

*/










describe("test userReservationList", () => {

  test("", async () => {

      let reserves = await userReservationList(1);

      expect(reserves).toHaveLength(2);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

  // and add your other tests here
/*
  reserves = await userReservationList(1);

  expect(reserves).toHaveLength(4);
  expect(fetch).toHaveBeenCalledTimes(2);
  */
});
