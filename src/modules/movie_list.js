const getMovies = async (request) => {
  let response;
  try {
    if (typeof (request) === 'number') {
      response = await fetch(`https://api.tvmaze.com/shows/${request}`);
    } else {
      response = await fetch(`https://api.tvmaze.com/search/shows?q=${request}`);
    }

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return `Error: ${error}`;
  }
};

export default getMovies;
