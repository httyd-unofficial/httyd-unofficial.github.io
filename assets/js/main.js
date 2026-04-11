import { createSettingsMenu } from './components/settingsMenu.js';
import { createSearchOverlay } from './components/searchOverlay.js';
import { applyTheme, getStoredTheme, setTheme, updateThemeCheckmarks } from './core/theme.js';
import { setupSearch } from './core/search.js';
import { lockScroll, unlockScroll } from './core/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inject components first so their DOM elements exist for everything below
  createSettingsMenu();
  createSearchOverlay();

  applyTheme(getStoredTheme());
  updateThemeCheckmarks(getStoredTheme());

  const savedEffects = localStorage.getItem('httyd-effects') !== 'disabled';
  const effectsToggle = document.getElementById('effects-toggle');
  if (effectsToggle) {
    effectsToggle.checked = savedEffects;
    if (!savedEffects) document.body.classList.add('no-blur');

    effectsToggle.addEventListener('change', e => {
      const enabled = e.target.checked;
      document.body.classList.toggle('no-blur', !enabled);
      localStorage.setItem('httyd-effects', enabled ? 'enabled' : 'disabled');
    });
  }

  setupSearch();

  document.addEventListener('click', e => {
    const settingsBtn = e.target.closest('#settings-toggle');
    if (settingsBtn) {
      const overlay = document.querySelector('.settings-overlay');
      if (overlay) {
        overlay.classList.add('active');
        lockScroll();
        updateThemeCheckmarks(getStoredTheme());
      }
      return;
    }

    const isClose = e.target.closest('.settings-close');
    const isBg = e.target.id === 'settings-overlay';
    if (isClose || isBg) {
      const overlay = document.querySelector('.settings-overlay');
      if (overlay) {
        overlay.classList.remove('active');
        unlockScroll();
      }
      return;
    }

    const themeOption = e.target.closest('.theme-option[data-theme]');
    if (themeOption) {
      const newTheme = themeOption.getAttribute('data-theme');
      setTheme(newTheme);
      return;
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const overlay = document.querySelector('.settings-overlay');
      if (overlay?.classList.contains('active')) {
        overlay.classList.remove('active');
        unlockScroll();
      }
    }
  });

  const header = document.querySelector('.main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  const imageTitleContainer = document.querySelector('.image-title-container');
  const textTitleContainer = document.querySelector('.text-title-container');
  if (imageTitleContainer && textTitleContainer) {
    const toggleTitle = () => {
      imageTitleContainer.classList.toggle('hidden');
      textTitleContainer.classList.toggle('hidden');
    };
    imageTitleContainer.addEventListener('click', toggleTitle);
    textTitleContainer.addEventListener('click', toggleTitle);
  }

  document.querySelectorAll('.scroll-row').forEach(row => {
    const section = row.closest('section');
    const h2 = section?.querySelector('h2');
    let t;

    const updatePadding = () => {
      const scrollLeft = row.scrollLeft;
      const maxScrollLeft = row.scrollWidth - row.clientWidth;
      row.style.paddingLeft = scrollLeft <= 0 ? '20px' : '0px';
      row.style.paddingRight = scrollLeft >= maxScrollLeft - 1 ? '20px' : '0px';
    };

    row.addEventListener('scroll', () => {
      updatePadding();
      if (h2) {
        h2.classList.add('shrink-margin');
        clearTimeout(t);
        t = setTimeout(() => {
          if (row.scrollLeft === 0 || row.scrollLeft + row.clientWidth >= row.scrollWidth) {
            h2.classList.remove('shrink-margin');
          }
        }, 100);
      }
    }, { passive: true });

    window.addEventListener('resize', updatePadding, { passive: true });
    updatePadding();
  });

  const heroCarousel = document.querySelector('.hero-carousel');
  const heroButton = document.querySelector('.hero-button');
  if (heroCarousel && heroButton) {
    heroCarousel.addEventListener('scroll', () => {
      const atFirst = heroCarousel.scrollLeft < heroCarousel.clientWidth / 2;
      heroButton.style.opacity = atFirst ? '1' : '0';
      heroButton.style.pointerEvents = atFirst ? 'auto' : 'none';
    }, { passive: true });
  }

  document.getElementById('current-year').textContent = new Date().getFullYear();
});
