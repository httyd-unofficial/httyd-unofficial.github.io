const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
  const scrolledDown = window.scrollY > 10;
  if (header) {
    header.classList.toggle('scrolled', scrolledDown);
    header.classList.toggle('shrink', scrolledDown);
  }
});

const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
const applyTheme = (e) => {
  document.body.classList.toggle('dark', e.matches);
  document.querySelector('meta[name="theme-color"]').setAttribute('content', e.matches ? '#121212' : '#ffffff');
};
applyTheme(themeMedia);
themeMedia.addEventListener('change', applyTheme);

const searchIcon = document.getElementById('search-icon');
const searchOverlay = document.querySelector('.search-overlay');
const closeBtn = document.getElementById('close-search');
const searchBox = document.getElementById('search-box');
const cards = document.querySelectorAll('.search-results .card');

searchIcon.addEventListener('click', () => {
  searchOverlay.classList.add('active');
  setTimeout(() => searchBox.focus(), 300);
});

closeBtn.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
  searchBox.value = '';
  cards.forEach(card => card.style.display = '');
});

searchBox.addEventListener('input', () => {
  const keyword = searchBox.value.trim().toLowerCase();
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(keyword) ? '' : 'none';
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
    closeBtn.click();
  }
});

document.getElementById("current-year").textContent = new Date().getFullYear();

  const imageTitle = document.querySelector('.image-title');
  const textTitle = document.querySelector('.text-title');

  function toggleTitle() {
    const isImageVisible = imageTitle.style.display !== 'none';
    imageTitle.style.display = isImageVisible ? 'none' : 'block';
    textTitle.style.display = isImageVisible ? 'block' : 'none';
  }

  imageTitle.addEventListener('click', toggleTitle);
  textTitle.addEventListener('click', toggleTitle);
