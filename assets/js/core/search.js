import { debounce, lockScroll, unlockScroll } from './utils.js';

function buildSearchIndex() {
  const index = [];

  document.querySelectorAll('section').forEach(section => {
    const sectionTitle = section.querySelector('h2')?.textContent?.trim() || '';

    section.querySelectorAll('.card').forEach(card => {
      const title = card.querySelector('h3')?.textContent?.trim() || '';
      const description = card.querySelector('p')?.textContent?.trim() || '';
      const img = card.querySelector('img');
      const imgSrc = img?.getAttribute('src') || '';
      const imgAlt = img?.getAttribute('alt') || '';

      index.push({
        title,
        description,
        imgSrc,
        imgAlt,
        category: sectionTitle,
        searchText: `${title} ${description} ${sectionTitle}`.toLowerCase(),
      });
    });
  });

  return index;
}

function renderResults(term, index, container) {
  container.innerHTML = '';

  if (!term) {
    container.style.display = 'none';
    return;
  }

  const matches = index.filter(item => item.searchText.includes(term));

  if (matches.length === 0) {
    container.style.display = 'flex';
    container.innerHTML = `<p class="no-results-msg fade-in-slide">No results for "<strong>${term}</strong>".</p>`;
    return;
  }

  const byCategory = {};
  matches.forEach(item => {
    if (!byCategory[item.category]) byCategory[item.category] = [];
    byCategory[item.category].push(item);
  });

  container.style.display = 'block';
  container.style.paddingTop = '0.5rem';

  Object.entries(byCategory).forEach(([cat, items]) => {
    const heading = document.createElement('h2');
    heading.className = 'search-results-title fade-in-slide';
    heading.textContent = cat;
    container.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'search-results-grid';

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'search-result-card fade-in-slide';
      card.innerHTML = `
        ${item.imgSrc ? `<img src="${item.imgSrc}" alt="${item.imgAlt}" loading="lazy" />` : ''}
        <div class="content">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      `;
      grid.appendChild(card);
    });

    container.appendChild(grid);
  });
}

export function setupSearch() {
  const searchToggle = document.getElementById('search-toggle');
  const searchClose = document.getElementById('search-close');
  const searchOverlay = document.getElementById('search-overlay');
  const searchModalContent = document.querySelector('.search-modal-content');
  const searchInput = document.getElementById('fullscreen-search-input');
  const resultsContainer = document.getElementById('search-results-container');

  if (!searchOverlay || !searchInput || !resultsContainer) return;

  let searchIndex = null;

  const openSearch = () => {
    if (!searchIndex) searchIndex = buildSearchIndex();
    lockScroll();
    searchOverlay.classList.add('active');
    searchOverlay.scrollTop = 0;
    if (searchModalContent) searchModalContent.classList.add('is-sticky');
    setTimeout(() => searchInput.focus(), 350);
  };

  const closeSearch = () => {
    resultsContainer.classList.add('fade-out-slide');
    setTimeout(() => {
      searchOverlay.classList.remove('active');
      if (searchModalContent) searchModalContent.classList.remove('is-sticky');
      unlockScroll();
      searchInput.value = '';
      resultsContainer.innerHTML = '';
      resultsContainer.style.display = 'none';
      resultsContainer.classList.remove('fade-out-slide');
    }, 180);
  };

  if (searchToggle) searchToggle.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  searchOverlay.addEventListener('click', e => {
    if (e.target === searchOverlay) closeSearch();
  });

  searchOverlay.addEventListener('scroll', () => {
    if (searchOverlay.scrollTop > 5) {
      searchOverlay.classList.add('scrolled-down');
    } else {
      searchOverlay.classList.remove('scrolled-down');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });

  const debouncedFilter = debounce((term) => {
    renderResults(term.toLowerCase().trim(), searchIndex, resultsContainer);
  }, 200);

  searchInput.addEventListener('input', e => debouncedFilter(e.target.value));
}
