import './css/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

const appId = 'Dk9UnpgPWAMDZ19Gse0r';
const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`;
const movie = 'comedy';
const url = `https://api.tvmaze.com/search/shows?q=${movie}`;

const displayMovies = document.querySelector('#display-movies');
export async function getMovies() {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export async function getComments(id) {
  const response = await fetch(`${commentUrl}?item_id=${id}`);
  const result = await response.json();
  console.log(result);
  return result;
}

const commentForm = document.createElement('form');
commentForm.classList.add('comment-form');
const commentTitle = document.createElement('h2');
commentTitle.classList.add('comment-item');
commentTitle.innerHTML = 'Add a comment';
const NameInput = document.createElement('input');
NameInput.classList.add('comment-item');
NameInput.placeholder = 'Your name';
const CommentInput = document.createElement('textarea');
CommentInput.classList.add('comment-item');
CommentInput.placeholder = 'Your comments';
const addCommentButton = document.createElement('button');
addCommentButton.classList.add('comment-item');
addCommentButton.innerHTML = 'Comment';

export const addComment = async (id)=> {
  const result = fetch(commentUrl, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username: NameInput.value.trim(),
      comment: CommentInput.value.trim(),
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })

  return (await result).json;
  NameInput.value = '';
  CommentInput = '';
}



export const popupMovieDetail = async (id) => {
  const movies = await getMovies();
  const comments = await getComments(id);
  const detailPopup = document.createElement('div');
  detailPopup.className = 'popup';
  movies.forEach((movie) => {
    if (id === movie.show.id) {
      const movieItem = document.createElement('div');
      movieItem.className = 'movie-item';
      const movieName = document.createElement('lable');
      movieName.innerHTML += `${movie.show.name}`;
      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.innerHTML = 'close';
      const movieStatus = document.createElement('lable');
      movieStatus.innerHTML += `Status : ${movie.show.status}`;
      const moviePremiered = document.createElement('lable');
      moviePremiered.innerHTML += `Premiered : ${movie.show.premiered}`;
      const movieImage = document.createElement('img');
      movieImage.src = movie.show.image.medium;
      
      const commentHeader = document.createElement('h2');
      commentHeader.innerHTML = 'Comments';
      const commentList = document.createElement('ul');
      document.body.append(detailPopup);
      if (comments.length > 0) {
        comments.forEach((comment) => {
          const singleComment = document.createElement('li');
          singleComment.innerHTML = `${comment.creation_date} ${comment.username} : ${comment.comment}`;
          commentList.append(singleComment);
        });
      }

      commentForm.append(commentTitle , NameInput , CommentInput , addCommentButton )
      movieItem.append(movieName, movieImage, movieStatus, moviePremiered, closeButton , commentForm);
      detailPopup.append(movieItem, commentHeader, commentList);
      
      closeButton.addEventListener('click', () => {
        document.body.removeChild(detailPopup);
        document.body.style.overflow = 'auto';
      });

      addCommentButton.addEventListener('click' , (e) => {  
        e.preventDefault();
        addComment(movie.show.id);
        commentForm.reset();
      });

    }
  });
};

export const display = async () => {
  const movies = await getMovies();
  movies.forEach((movie) => {
    const movieList = document.createElement('div');
    movieList.className = 'movie-list';
    displayMovies.append(movieList);
    const movieName = document.createElement('lable');
    movieName.innerHTML += `${movie.show.name}`;
    const movieImage = document.createElement('img');
    movieImage.src = movie.show.image.medium;
    const commentButton = document.createElement('button');
    commentButton.type = 'button';
    commentButton.className = 'comment';
    commentButton.innerHTML += 'comment';
    movieList.append(movieName, movieImage, commentButton);

    commentButton.addEventListener('click', () => {
      popupMovieDetail(movie.show.id);
      document.body.style.overflow = 'hidden';
    });
  });
};

display();
