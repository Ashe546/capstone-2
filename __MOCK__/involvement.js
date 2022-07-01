/* eslint-disable */
class Involvement {
  constructor() {
    this.arr = [
      {
    		username: 'John',
    		date_start: '2020-12-17',
        date_end: '2020-12-18',
      },
      {
    		username: 'Jane',
    		date_start: '2021-1-12',
    		date_end: '2021-1-17',
      },
    ];
  }

  async getCustomData(actionUrl) {
    const request = actionUrl;
    const response = this.arr;
    try {
      if (request === '/reservations?item_id=1') {
        return await Promise.resolve(response);
      }
    } catch (error) {
      return 'Error: 400';
    }
  }
}

const involvement = new Involvement();

export default involvement;
