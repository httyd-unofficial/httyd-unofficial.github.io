import { books, films, shows, specials } from '../data/cards.js';
import { characters, dragonSpecies } from '../data/library.js';

function buildCard({ img, alt, title, description, badge }) {
  return `<div class="card">
    <img src="${img}" alt="${alt}" loading="lazy" />
    ${badge ? `<span class="card-badge">${badge}</span>` : ''}
    <div class="card-content">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  </div>`;
}

function buildScrollSection(label, heading, items) {
  return `<section class="scroll-section">
    <span class="section-label">${label}</span>
    <h2 class="section-heading">${heading}</h2>
    <div class="scroll-row">
      ${items.map(buildCard).join('\n      ')}
    </div>
  </section>`;
}

function buildCharacterList(items, isMain = false) {
  return items.map(name => `<li${isMain ? ' class="is-main-char"' : ''}>${name}</li>`).join('\n');
}

function buildCharacterSection() {
  const { books: b, films: f } = characters;
  return `<section class="info-section">
    <div class="info-inner">
      <h2>Characters, Villains &amp; Dragons</h2>
      <div class="media-split">
        <div class="media-group">
          <h3>Books</h3>
          <div class="list-block">
            <h4>Characters</h4>
            <ul class="character-list">
              ${buildCharacterList(b.main, true)}
              ${buildCharacterList(b.supporting)}
            </ul>
          </div>
          <div class="list-block">
            <h4>Villains</h4>
            <ul>${buildCharacterList(b.villains)}</ul>
          </div>
          <div class="list-block">
            <h4>Dragons</h4>
            <ul>${buildCharacterList(b.dragons)}</ul>
          </div>
        </div>
        <div class="media-group">
          <h3>Films / Shows</h3>
          <div class="list-block">
            <h4>Characters</h4>
            <ul class="character-list">
              ${buildCharacterList(f.main, true)}
              ${buildCharacterList(f.supporting)}
            </ul>
          </div>
          <div class="list-block">
            <h4>Villains</h4>
            <ul>${buildCharacterList(f.villains)}</ul>
          </div>
          <div class="list-block">
            <h4>Dragons</h4>
            <ul>${buildCharacterList(f.dragons)}</ul>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function buildLibrarySection() {
  const { books: b, films: f } = dragonSpecies;
  return `<section class="info-section">
    <div class="info-inner">
      <h2>Dragon Library</h2>
      <div class="media-split">
        <div class="media-group">
          <h3>Books</h3>
          <h4>Dragon Species</h4>
          <ul>${buildCharacterList(b)}</ul>
        </div>
        <div class="media-group">
          <h3>Films / Shows</h3>
          <h4>Dragon Species</h4>
          <ul>${buildCharacterList(f)}</ul>
        </div>
      </div>
    </div>
  </section>`;
}

function buildHeroSection() {
  return `<section class="hero-section">
    <h1 class="hero-title">How to Train<br>Your Dragon</h1>
    <p class="hero-body">
      Every book by <strong>Cressida Cowell</strong>, every DreamWorks film,
      every series, and every special — all in one place.
    </p>
  </section>`;
}

function buildThankYouSection() {
  return `<section class="thank-you">
    <div class="info-inner">
      <h2>Thank You</h2>
      <p>
        A heartfelt thank you to <strong>Cressida Cowell</strong> for her wonderful books that sparked
        the world of <em>How to Train Your Dragon</em>, and to the entire team at
        <strong>DreamWorks Animation</strong> for bringing that world to life on screen.
      </p>
      <p>
        From the first book to the twelfth, then soaring onto the big screen in 2010 and continuing
        through every show and film that followed — thank you for the adventure, the memories, and the dragons.
      </p>
    </div>
  </section>`;
}

export function renderSections() {
  const placeholder = document.getElementById('sections-placeholder');
  if (!placeholder) return;

  const html = `
    ${buildHeroSection()}
    ${buildScrollSection('Cressida Cowell', 'Books', books)}
    ${buildScrollSection('DreamWorks Animation', 'Films', films)}
    ${buildScrollSection('DreamWorks Animation', 'Shows', shows)}
    ${buildScrollSection('Short Films &amp; Specials', 'Specials', specials)}
    ${buildCharacterSection()}
    ${buildLibrarySection()}
    ${buildThankYouSection()}
  `;

  const fragment = document.createRange().createContextualFragment(html);
  placeholder.replaceWith(fragment);
}