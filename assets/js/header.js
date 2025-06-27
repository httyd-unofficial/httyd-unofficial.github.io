// Header Animation
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
  const scrolledDown = window.scrollY > 10;
  if (header) {
    header.classList.toggle('scrolled', scrolledDown);
    header.classList.toggle('shrink', scrolledDown);
  }
});

const translucencyToggle = document.getElementById('translucency-toggle');
const translucentElements = document.querySelectorAll('.translucent');

// Load setting from localStorage
const savedTranslucency = localStorage.getItem('translucency');
if (savedTranslucency === 'off') {
  translucencyToggle.checked = false;
  translucentElements.forEach(el => el.classList.add('no-translucency'));
}

// Update on toggle
translucencyToggle.addEventListener('change', () => {
  const enabled = translucencyToggle.checked;
  localStorage.setItem('translucency', enabled ? 'on' : 'off');
  translucentElements.forEach(el => {
    el.classList.toggle('no-translucency', !enabled);
  });
});