document.addEventListener('DOMContentLoaded', () => {
  const themeSelect = document.getElementById('theme-select');
  const metaColor = document.querySelector('meta[name="theme-color"]');
  const translucencyToggle = document.getElementById('translucency-toggle');
  const translucentElements = document.querySelectorAll('.translucent, .main-header');

  function updateTheme(mode, isHardReset = false) {
    document.body.classList.remove('light', 'dark');
    
    let finalThemeForBody = mode;
    let metaThemeColor = '#ffffff';

    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      finalThemeForBody = prefersDark ? 'dark' : 'light';
      metaThemeColor = prefersDark ? '#121212' : '#ffffff';
    } else if (mode === 'dark') {
      finalThemeForBody = 'dark';
      metaThemeColor = '#121212';
    } else {
      finalThemeForBody = 'light';
      metaThemeColor = '#ffffff';
    }
    
    document.body.classList.add(finalThemeForBody);
    if (metaColor) {
      metaColor.setAttribute('content', metaThemeColor);
    }

    if (isHardReset) {
      localStorage.removeItem('preferred-theme');
    } else {
      localStorage.setItem('preferred-theme', mode);
    }
  }

  function watchSystemTheme() {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', () => {
      if (localStorage.getItem('preferred-theme') === 'system' || localStorage.getItem('preferred-theme') === null) {
          updateTheme('system');
      }
    });
  }

  function applyTranslucency(isTranslucent, isHardReset = false) {
    translucentElements.forEach(el => {
      el.classList.toggle('translucent', isTranslucent);
      el.classList.toggle('no-translucency', !isTranslucent);
    });

    if (isHardReset) {
      localStorage.removeItem('translucency');
    } else {
      localStorage.setItem('translucency', isTranslucent ? 'on' : 'off');
    }
  }

  const storedTheme = localStorage.getItem('preferred-theme');
  if (storedTheme) {
    themeSelect.value = storedTheme;
    updateTheme(storedTheme);
  } else {
    themeSelect.value = 'system';
    updateTheme('system');
  }
  watchSystemTheme();

  const savedTranslucency = localStorage.getItem('translucency');
  if (savedTranslucency === 'off') {
    translucencyToggle.checked = false;
    applyTranslucency(false);
  } else {
    translucencyToggle.checked = true;
    applyTranslucency(true);
  }

  themeSelect.addEventListener('change', () => {
    const choice = themeSelect.value;
    updateTheme(choice);
  });

  translucencyToggle.addEventListener('change', () => {
    const enabled = translucencyToggle.checked;
    applyTranslucency(enabled);
  });

  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) {
    settingsModal.addEventListener('resetSettings', (event) => {
      const { theme, translucency, hardReset } = event.detail;

      themeSelect.value = theme;
      updateTheme(theme, hardReset);

      translucencyToggle.checked = translucency;
      applyTranslucency(translucency, hardReset);
    });
  }
});
