document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.main-header');

  if (header) {
    window.addEventListener('scroll', () => {
      const scrolledDown = window.scrollY > 10;
      header.classList.toggle('scrolled', scrolledDown);
      header.classList.toggle('shrink', scrolledDown);
    });
  }
});
