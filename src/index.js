const movie = 'comedy';
const url = `https://api.tvmaze.com/search/shows?q=${movie}`;
const id = 'zKBC4nNh50AWVbWHEjaM';
const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi//apps/${id}/comments`;
import display from './display';

  async function getMovies() {
    const requestURL = url;
    const request = new Request(requestURL);
    const response = await fetch(request); 
    const movies = await response.json();
    
    console.log(movies[2].show);
    movies.forEach(movie => {
        display(movie.show.name ,movie.show.image.medium , movie.show.id )
    });
    
  }
  getMovies();



//   async function getComment() {
//     const requestURL = url;
//     const request = new Request(requestURL);
  
//     const response = await fetch(request);
//     const scores = await response.json();
//     const { result } = scores;
//     document.querySelector('.list').innerHTML = '';
//     result.forEach((score) => {
//       display(score.user, score.score);
//     });
//   }