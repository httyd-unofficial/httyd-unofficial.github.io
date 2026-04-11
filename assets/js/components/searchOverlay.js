export function createSearchOverlay() {
  const html = `
    <div class="search-overlay" id="search-overlay">
      <div class="search-modal-content">
        <input
          type="text"
          id="fullscreen-search-input"
          class="search-input-full"
          placeholder="Search books, films, shows…"
          autocomplete="off"
          spellcheck="false"
        />
        <button class="search-close" id="search-close" aria-label="Close search">&times;</button>
      </div>
      <div id="search-results-container" style="display:none;"></div>
    </div>
  `;

  const placeholder = document.getElementById('search-overlay-placeholder');
  if (placeholder) {
    placeholder.outerHTML = html;
  }
}
