const display = (name, img , id) => {
    document.querySelector('#display-movies').innerHTML += `
    <lable>${name}</lable>
    <img src='${img}' alt='img-move${id}'>
    `;
  };
  
  export default display;