export function createFooter() {
  const html = `
    <footer class="footer">
      <div class="footer-top">
        <h2 class="footer-title">HTTYD Unofficial</h2>
        <p class="footer-description">
          This is a fan-made website. It is not affiliated with DreamWorks Animation or Cressida Cowell. All characters, images, and trademarks belong to their respective owners.
        </p>
      </div>
      <div class="footer-bottom">
        <p>
          &copy; <span id="current-year"></span> Gabriel Longshaw. All rights reserved.
        </p>
        <p class="meta">
          Jesus said to him, "I am the way, the truth, and the life. No one comes to the Father except through Me." — John 14:6 NKJV
        </p>
        <p>
          Designed and developed by
          <a class="name" href="https://gabriellongshaw.co.uk/" target="_blank" rel="noopener">Gabriel Longshaw</a>.
        </p>
      </div>
    </footer>
  `;

  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.outerHTML = html;
  }
}
