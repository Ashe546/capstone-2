const content = document.querySelector('body');

// Footer
const footer = `
<footer class="page-footer font-small bg-dark">
  <div class="text-white footer-copyright text-center py-3">© 2022 Copyright:
    <a class="text-white text-decoration-none" href="/">Created by ANZ-TEAM under CC license</a>
  </div>
</footer>`;

const renderFooter = () => {
  content.insertAdjacentHTML('beforeend', footer);
};

export default renderFooter;
