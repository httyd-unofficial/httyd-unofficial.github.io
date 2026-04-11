export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

export function lockScroll() {
  const scrollY = window.scrollY;
  document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
  document.documentElement.classList.add('scroll-lock');
  document.documentElement.style.top = `-${scrollY}px`;
}

export function unlockScroll() {
  const searchOverlay = document.querySelector('.search-overlay');
  const settingsOverlay = document.querySelector('.settings-overlay');

  const anyOpen = [searchOverlay, settingsOverlay]
    .some(el => el?.classList.contains('active'));

  if (anyOpen) return;

  const scrollY = parseInt(document.documentElement.style.getPropertyValue('--scroll-y') || '0');
  document.documentElement.classList.remove('scroll-lock');
  document.documentElement.style.top = '';
  document.documentElement.style.removeProperty('--scroll-y');
  window.scrollTo(0, scrollY);
}
