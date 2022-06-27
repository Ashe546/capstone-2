const display = (name, img , id) => {
    document.querySelector('#display-movies').innerHTML += `
    <div id='movie-list'>
    <lable>${name}</lable>
    <img src='${img}' alt='img-move${id}'>
    <button type='submit' class="comment">comment</button>
    </div>
    `;
  };
  
  export default display;