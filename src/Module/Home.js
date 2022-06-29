// hompage 
const component = () => {
    const element = document.createElement('div');
    element.className = 'row';
      element.innerHTML += `<div class="col-3" style="height: 300px; margin-right: 100px; margin-left: 80px;">
        <div class="row" style="height: 50%; background-color:azure align-items: center; justify-content: center;"><img style ="height: 100%; width: auto;" src="https://static.tvmaze.com/uploads/images/medium_portrait/171/428737.jpg" alt="img"></div>
        <div class="row"><h1>Space 1 <i>heart</i></h1></div>
        <div class="button-tags">
          <button>Comment</button>
          <button>Reservation</button>
        </div>
      </div>`;
    return element;
  };

  export { component }