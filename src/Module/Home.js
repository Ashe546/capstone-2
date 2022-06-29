// hompage 
const component = (name, img) => {
    const element = document.createElement('div');
    element.className = 'col-3 home-col';
      element.innerHTML += `<div class="row" style="height: 50%; background-color:azure align-items: center; justify-content: center;">
        <img style ="height: 100%; width: auto;" src=${img} alt="img"></div>
        <div class="row"><h1>${name}<i>heart</i></h1></div>
        <div class="button-tags">
          <button>Comment</button>
          <button>Reservation</button>
        </div>`;
    return element;
  };

  export { component };