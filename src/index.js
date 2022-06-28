const movie = 'comedy';
const url = `https://api.tvmaze.com/search/shows?q=${movie}`;
const id = 'zKBC4nNh50AWVbWHEjaM';
const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi//apps/${id}/comments`;
// import display from './display';

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

 export const display = (name, img , id) => {
  const displayMovies = document.querySelector('#display-movies');
  const movieList = document.createElement('div');
  movieList.className = 'movie-list';
  displayMovies.append(movieList);
  const movieName = document.createElement('lable');
  movieName.innerHTML += `${name}`
  const movieImage = document.createElement('img');
  movieImage.src = `${img}`;
  const commentButton = document.createElement('button');
  commentButton.type = 'button';
  commentButton.className = 'comment';
  commentButton.innerHTML += 'comment';
  movieList.append(movieName, movieImage , commentButton);

     commentButton.addEventListener('click' , ()=> {
      console.log('clicked')
    })

  };


   



//   async function getComment() {
//     const requestURL = commentUrl;
//     const request = new Request(requestURL);
  
//     const response = await fetch(request);
//     const comments = await response.json();
//     console.log(comments);
   
//   }

//   getComment();