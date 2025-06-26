const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
const applyTheme = (e) => {
  document.body.classList.toggle('dark', e.matches);
  document.querySelector('meta[name="theme-color"]').setAttribute('content', e.matches ? '#121212' : '#ffffff');
};
applyTheme(themeMedia);
themeMedia.addEventListener('change', applyTheme);

const themeSelect = document.getElementById('theme-select');
const metaThemeColor = document.querySelector('meta[name="theme-color"]');

function applyThemeClass(value) {
  document.body.classList.remove('light', 'dark');
  if (value === 'light') {
    document.body.classList.add('light');
    metaThemeColor.setAttribute('content', '#ffffff');
  } else if (value === 'dark') {
    document.body.classList.add('dark');
    metaThemeColor.setAttribute('content', '#121212');
  } else {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.add(isDark ? 'dark' : 'light');
    metaThemeColor.setAttribute('content', isDark ? '#121212' : '#ffffff');
  }
}

function setupSystemThemeListener() {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.onchange = () => {
    if (themeSelect.value === 'system') {
      applyThemeClass('system');
    }
  };
}
