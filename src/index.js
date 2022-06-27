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
    
    console.log(movies[2].show.id);
    movies.forEach(movie => {
        display(movie.show.name ,movie.show.image.medium , movie.show.id )
      
    });
    
  }
  getMovies();

const commentButton = document.querySelectorAll('.comment');

    
commentButton.forEach(button => {
    button.addEventListener('click' , (e) => {
        e.preventDefault
        console.log('hey')
})
}) 


//   async function getComment() {
//     const requestURL = commentUrl;
//     const request = new Request(requestURL);
  
//     const response = await fetch(request);
//     const comments = await response.json();
//     console.log(comments);
   
//   }

//   getComment();