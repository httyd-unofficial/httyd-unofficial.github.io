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

const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeButton = settingsModal.querySelector('.close-button');
const backdrop = document.getElementById('backdrop');

function openDialog() {
  backdrop.classList.remove('hidden');
  requestAnimationFrame(() => {
    backdrop.classList.add('show');
  });
  
  if (!settingsModal.open) {
    settingsModal.showModal();
    requestAnimationFrame(() => {
      settingsModal.classList.add('open');
      settingsModal.classList.remove('closing');
    });
  }
}

function closeDialog() {
  settingsModal.classList.remove('open');
  settingsModal.classList.add('closing');
  backdrop.classList.remove('show');
  
  setTimeout(() => {
    settingsModal.close();
    backdrop.classList.add('hidden');
  }, 250); // match CSS transition duration
}

settingsButton.addEventListener('click', openDialog);
closeButton.addEventListener('click', closeDialog);

settingsModal.addEventListener('click', e => {
  if (e.target === settingsModal) {
    closeDialog();
  }
});

settingsModal.addEventListener('cancel', e => {
  e.preventDefault();
  closeDialog();
});

function applyPreferredTheme(value) {
  if (value === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    document.body.classList.toggle('dark', prefersDark.matches);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', prefersDark.matches ? '#121212' : '#ffffff');
    prefersDark.onchange = (e) => {
      document.body.classList.toggle('dark', e.matches);
      document.querySelector('meta[name="theme-color"]').setAttribute('content', e.matches ? '#121212' : '#ffffff');
    };
  } else {
    document.body.classList.toggle('dark', value === 'dark');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', value === 'dark' ? '#121212' : '#ffffff');
  }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'system';
themeSelect.value = savedTheme;
applyPreferredTheme(savedTheme);

themeSelect.addEventListener('change', () => {
  const selectedTheme = themeSelect.value;
  localStorage.setItem('theme', selectedTheme);
  applyPreferredTheme(selectedTheme);
});