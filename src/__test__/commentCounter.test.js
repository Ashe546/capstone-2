import itemCount from '../modules/counter.js';

const currentDay = new Date();
const date = `${currentDay.getFullYear()}-0${currentDay.getMonth() + 1}-${currentDay.getDate()}`;
const comments = [
  {
    name: 'Zellame',
    comment: 'Nice movie',
    date,
  },
  {
    name: 'Ashe',
    comment: 'Nice movie',
    date,
  },
  {
    name: 'Nadia',
    comment: 'Nice movie',
    date,
  },
];

describe('comment counter', () => {
  test('Comment Counter ', () => {
    expect(itemCount(comments)).toBe(3);
  });
});