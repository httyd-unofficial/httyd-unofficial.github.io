export function getStoredTheme() {
  return localStorage.getItem('httyd-theme') || 'system';
}

export function setTheme(theme) {
  localStorage.setItem('httyd-theme', theme);
  applyTheme(theme);
}

export function applyTheme(theme) {
  const body = document.body;
  const effectsToggle = document.getElementById('effects-toggle');

  body.classList.remove('dark', 'amoled-dark');

  let isActuallyDark = false;

  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      body.classList.add('dark');
      isActuallyDark = true;
    }
  } else if (theme === 'dark') {
    body.classList.add('dark');
    isActuallyDark = true;
  } else if (theme === 'amoled') {
    body.classList.add('amoled-dark');
    isActuallyDark = true;
  }

  const savedEffects = localStorage.getItem('httyd-effects') !== 'disabled';

  if (theme === 'amoled') {
    body.classList.add('no-blur');
    if (effectsToggle) {
      effectsToggle.checked = false;
      effectsToggle.disabled = true;
    }
  } else {
    if (effectsToggle) {
      effectsToggle.disabled = false;
      if (savedEffects) {
        body.classList.remove('no-blur');
        effectsToggle.checked = true;
      } else {
        body.classList.add('no-blur');
        effectsToggle.checked = false;
      }
    }
  }

  updateThemeCheckmarks(theme);
}

export function updateThemeCheckmarks(activeTheme) {
  document.querySelectorAll('.theme-option[data-theme]').forEach(option => {
    option.classList.toggle('active', option.getAttribute('data-theme') === activeTheme);
  });
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (getStoredTheme() === 'system') {
    applyTheme('system');
  }
});