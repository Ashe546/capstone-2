const content = document.querySelector('body');

// Footer
const footer = `
<footer class="footer white">
  <div class="copuright">© 2022 Copyright:
    <a class="linkstyle" href="/">Created by ANZ-TEAM under CC license</a>
  </div>
</footer>`;

const renderFooter = () => {
  content.insertAdjacentHTML('beforeend', footer);
};


export default renderFooter;
