/* eslint-disable */
import getMovies from './movie_list';
import itemCount from './counter';

const request = 'comedy';
const appId = 'Dk9UnpgPWAMDZ19Gse0r';
const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`;

export const getComments = async (id) => {
  const response = await fetch(`${commentUrl}?item_id=${id}`);
  const result = await response.json();

  return result;
};

const commentForm = document.createElement('form');
commentForm.classList.add('comment-form');
const commentTitle = document.createElement('h5');
commentTitle.className = 'comment-item';
commentTitle.innerHTML = 'Add a comment';
const NameInput = document.createElement('input');
NameInput.className = 'comment-item form-control';
NameInput.placeholder = 'Your name';
const CommentInput = document.createElement('textarea');
CommentInput.className = 'comment-item form-control';
CommentInput.placeholder = 'Your comments';
const addCommentButton = document.createElement('button');
addCommentButton.innerHTML = 'Add Comment';
addCommentButton.className = 'btn';

export async function addComment(id) {
  const result = fetch(commentUrl, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username: NameInput.value,
      comment: CommentInput.value,
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  return result.json;
}

const popupMovieDetail = async (id) => {
  const movies = await getMovies(request);
  const comments = await getComments(id);
  const detailPopup = document.createElement('div');
  detailPopup.className = 'popup';
  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';
  movies.forEach((movie) => {
    if (id === movie.show.id) {
      const movieItem = document.createElement('div');
      movieItem.className = 'movie-item';
      const movieName = document.createElement('h3');
      movieName.innerHTML += `${movie.show.name}`;
      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.innerHTML = 'close';
      closeButton.className = 'close';
      const movieStatus = document.createElement('lable');
      movieStatus.innerHTML += `Status : ${movie.show.status}`;
      const moviePremiered = document.createElement('lable');
      moviePremiered.innerHTML += `Premiered : ${movie.show.premiered}`;
      const movieImage = document.createElement('img');
      movieImage.src = movie.show.image.medium;
      document.body.append(detailPopup);
      const commentSection = document.createElement('div');
      commentSection.className = 'comment-section';
      const commentHeader = document.createElement('h5');
      commentHeader.innerHTML = 'Comments';
      const commentList = document.createElement('ul');
      const commnetNumber = document.createElement('span');
      const commentCounter = itemCount(comments);
      if (comments.length > 0) {
        comments.forEach((comment) => {
          commnetNumber.innerHTML = `(${commentCounter})`;
          commentHeader.append(commnetNumber);
          const singleComment = document.createElement('li');
          singleComment.innerHTML = `${comment.creation_date} ${comment.username} : ${comment.comment}`;
          commentList.append(singleComment);
        });
      }

      commentForm.append(NameInput, CommentInput, addCommentButton);
      commentSection.append(commentHeader, commentList, commentTitle, commentForm);
      movieItem.append(movieName, movieImage, movieStatus);
      movieItem.append(moviePremiered, closeButton);
      popupContent.append(movieItem, commentSection);
      detailPopup.append(popupContent);

      closeButton.addEventListener('click', () => {
        document.body.removeChild(detailPopup);
        document.body.style.overflow = 'auto';
      });

      addCommentButton.addEventListener('click', (e) => {
        e.preventDefault();
        addComment(movie.show.id);
        const currentDay = new Date();
        const date = `${currentDay.getFullYear()}-0${currentDay.getMonth() + 1}-${currentDay.getDate()}`;

        const commentCounter = itemCount(comments) + 1;
        commnetNumber.innerHTML = `(${commentCounter})`;
        commentHeader.append(commnetNumber);
        const singleComment = document.createElement('li');
        const commentUser = `${NameInput.value}`;
        const commentContent = `${CommentInput.value}`;
        singleComment.innerHTML = `${date} ${commentUser} : ${commentContent}`;
        commentList.append(singleComment);

        commentForm.reset();
      });
    }
  });
};

export default popupMovieDetail;
