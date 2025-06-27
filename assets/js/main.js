// Header Animation
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
  const scrolledDown = window.scrollY > 10;
  if (header) {
    header.classList.toggle('scrolled', scrolledDown);
    header.classList.toggle('shrink', scrolledDown);
  }
});

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

const imageTitleContainer = document.querySelector('.image-title-container');
const textTitleContainer = document.querySelector('.text-title-container');

function toggleTitle() {
  imageTitleContainer.classList.toggle('hidden');
  textTitleContainer.classList.toggle('hidden');
}

imageTitleContainer.addEventListener('click', toggleTitle);
textTitleContainer.addEventListener('click', toggleTitle);

// Scroll Wrapper Padding
document.querySelectorAll('.scroll-wrapper').forEach(wrapper => {
  const row = wrapper.querySelector('.scroll-row');
  
  const updatePadding = () => {
    const scrollLeft = wrapper.scrollLeft;
    const maxScrollLeft = row.scrollWidth - wrapper.clientWidth;
    
    if (scrollLeft <= 0) {
      row.style.paddingLeft = '24px';
    } else {
      row.style.paddingLeft = '0px';
    }
    
    if (scrollLeft >= maxScrollLeft - 1) {
      row.style.paddingRight = '24px';
    } else {
      row.style.paddingRight = '0px';
    }
  };
  
  wrapper.addEventListener('scroll', updatePadding);
  window.addEventListener('resize', updatePadding);
  updatePadding();
});

// Section h2 margin animation
document.querySelectorAll('.scroll-row').forEach(row => {
  const section = row.closest('section');
  const h2 = section?.querySelector('h2');
  if (!h2) return;
  
  let scrollTimeout;
  
  row.addEventListener('scroll', () => {
    h2.classList.add('shrink-margin');
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (row.scrollLeft === 0 || row.scrollLeft + row.clientWidth >= row.scrollWidth) {
        h2.classList.remove('shrink-margin');
      }
    }, 100);
  });
});

// Hero button toggle on scroll
const heroCarousel = document.querySelector('.hero-carousel');
const heroButton = document.querySelector('.hero-button');

if (heroCarousel && heroButton) {
  heroCarousel.addEventListener('scroll', () => {
    const atFirstSlide = heroCarousel.scrollLeft < heroCarousel.clientWidth / 2;
    
    if (atFirstSlide) {
      heroButton.style.opacity = '1';
      heroButton.style.pointerEvents = 'auto';
      heroButton.disabled = false;
    } else {
      heroButton.style.opacity = '0';
      heroButton.style.pointerEvents = 'none';
      heroButton.disabled = true;
    }
  });
}