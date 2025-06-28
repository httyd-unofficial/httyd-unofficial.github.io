document.addEventListener('DOMContentLoaded', () => {
  const settingsModal = document.getElementById('settings-modal');
  const closeSettingsButton = document.getElementById('close-settings');
  const themeSelect = document.getElementById('theme-select');
  const translucencyToggle = document.getElementById('translucency-toggle');
  const fontSelect = document.getElementById('font-select');
  
  function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    }
    localStorage.setItem('selectedTheme', theme);
  }
  
  function applyTranslucency(isTranslucent) {
    if (isTranslucent) {
      document.body.classList.add('translucent');
    } else {
      document.body.classList.remove('translucent');
    }
    localStorage.setItem('translucencyEnabled', isTranslucent);
  }
  
  function applyFont(fontName) {
    
    document.body.classList.forEach(className => {
      if (className.startsWith('font-')) {
        document.body.classList.remove(className);
      }
    });
    
    if (fontName === 'OneUISans') {
      document.body.classList.add('font-OneUISans');
    } else if (fontName === 'system') {
      document.body.classList.add('font-system');
    } else if (fontName === 'Roboto') {
      document.body.classList.add('font-Roboto');
    } else if (fontName === 'Open Sans') {
      document.body.classList.add('font-Open-Sans');
    }
    
    localStorage.setItem('selectedFont', fontName);
  }
  
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
  } else {
    applyTheme(themeSelect.value);
  }
  
  const savedTranslucency = localStorage.getItem('translucencyEnabled');
  if (savedTranslucency !== null) {
    const isTranslucent = savedTranslucency === 'true';
    translucencyToggle.checked = isTranslucent;
    applyTranslucency(isTranslucent);
  }
  
  const savedFont = localStorage.getItem('selectedFont');
  const defaultFont = 'system';
  
  if (savedFont) {
    
    fontSelect.value = savedFont;
    
    if (fontSelect.value !== savedFont) {
      
      fontSelect.value = defaultFont;
      applyFont(defaultFont);
    } else {
      applyFont(savedFont);
    }
  } else {
    
    fontSelect.value = defaultFont;
    applyFont(defaultFont);
  }
  
  closeSettingsButton.addEventListener('click', () => {
    if (typeof closeDialog === 'function') {
      closeDialog();
    } else {
      console.warn("closeDialog function not found, falling back to instant close.");
      settingsModal.close();
      document.getElementById('backdrop').classList.add('hidden');
    }
  });
  
  themeSelect.addEventListener('change', (event) => {
    applyTheme(event.target.value);
  });
  
  translucencyToggle.addEventListener('change', (event) => {
    applyTranslucency(event.target.checked);
  });
  
  fontSelect.addEventListener('change', (event) => {
    applyFont(event.target.value);
  });
  
});