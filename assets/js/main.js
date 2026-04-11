import { createSettingsMenu } from './components/settingsMenu.js';
import { createSearchOverlay } from './components/searchOverlay.js';
import { applyTheme, getStoredTheme, setTheme, updateThemeCheckmarks } from './core/theme.js';
import { setupSearch } from './core/search.js';
import { lockScroll, unlockScroll } from './core/utils.js';
import { renderSections } from './core/render.js';

document.addEventListener('DOMContentLoaded', () => {
  createSettingsMenu();
  createSearchOverlay();
  renderSections();

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
    if (e.target.closest('#settings-toggle')) {
      const overlay = document.querySelector('.settings-overlay');
      if (overlay) {
        overlay.classList.add('active');
        lockScroll();
        updateThemeCheckmarks(getStoredTheme());
      }
      return;
    }

    if (e.target.closest('.settings-close') || e.target.id === 'settings-overlay') {
      const overlay = document.querySelector('.settings-overlay');
      if (overlay) {
        overlay.classList.remove('active');
        unlockScroll();
      }
      return;
    }

    const themeOption = e.target.closest('.theme-option[data-theme]');
    if (themeOption) {
      setTheme(themeOption.getAttribute('data-theme'));
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

  const header = document.querySelector('.header');
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