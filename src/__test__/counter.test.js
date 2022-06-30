import itemCount from '../modules/counter.js';

test('Add on new item to the API', () => {
  expect(itemCount(['243', '2342'])).toBe(2);
});