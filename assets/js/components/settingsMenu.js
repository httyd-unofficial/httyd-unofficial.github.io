export function createSettingsMenu() {
  const html = `
    <div class="settings-overlay" id="settings-overlay">
      <div class="settings-content">
        <div class="settings-header">
          <h2>Settings</h2>
          <button class="settings-close" aria-label="Close settings">&times;</button>
        </div>
        <div class="settings-body">
          <div class="settings-section">
            <h3>Appearance</h3>
            <p class="settings-desc">Choose how the site looks to you.</p>
            <div class="theme-grid">
              <button class="theme-option" data-theme="system">
                <div class="theme-preview system"></div>
                <div class="theme-label-container">
                  <span>System</span>
                  <div class="theme-tick"></div>
                </div>
              </button>
              <button class="theme-option" data-theme="light">
                <div class="theme-preview light"></div>
                <div class="theme-label-container">
                  <span>Light</span>
                  <div class="theme-tick"></div>
                </div>
              </button>
              <button class="theme-option" data-theme="dark">
                <div class="theme-preview dark"></div>
                <div class="theme-label-container">
                  <span>Dark</span>
                  <div class="theme-tick"></div>
                </div>
              </button>
              <button class="theme-option" data-theme="amoled">
                <div class="theme-preview amoled"></div>
                <div class="theme-label-container">
                  <span>Amoled</span>
                  <div class="theme-tick"></div>
                </div>
              </button>
            </div>
          </div>
          <div class="settings-section">
            <h3>Graphics & Performance</h3>
            <div class="setting-row" id="blur-row">
              <div class="setting-info">
                <span class="setting-title">Blur Effects</span>
                <span class="setting-subtitle">Glassmorphism and translucency. Disable for better performance.</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="effects-toggle">
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const placeholder = document.getElementById('settings-menu-placeholder');
  if (placeholder) {
    placeholder.outerHTML = html;
  }
}