const appId = 'rLKop6ryC6FKdoYHiEPT';

class Involvement {
  constructor() {
    this.url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
  }

  // why do you still have this method here when you already have app ID?
  async createNewApp() {
    const request = new Request(this.url, {
    method: 'POST',
  });
  const response = await fetch(request);
  return response.text();
  }

  async postCustomData(object, actionUrl) {
    const url = this.url + appId + actionUrl;
    const request = new Request(url, {
      method: 'POST',
      // when you're posting json-like object, this header is required
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    });
    const response = await fetch(request);
    return response
  }

  async getCustomData(actionUrl) {
    const url = this.url + appId + actionUrl;
    const request = new Request(url, {
      method: 'GET',
    });
    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return `Error: ${error}`;
    }
  }
}

const involvement = new Involvement();

export default involvement;
