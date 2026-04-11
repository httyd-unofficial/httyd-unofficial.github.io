import { books, films, shows, specials } from '../data/cards.js';
import { characters, dragonSpecies } from '../data/library.js';

function buildCard({ img, alt, title, description, badge }) {
  return `<div class="card">
    <img src="${img}" alt="${alt}" loading="lazy" />
    ${badge ? `<span class="card-badge">${badge}</span>` : ''}
    <div class="content">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  </div>`;
}

function buildScrollSection(label, heading, items) {
  return `<section>
    <span class="section-label">${label}</span>
    <h2>${heading}</h2>
    <div class="scroll-wrapper">
      <div class="scroll-row">
        ${items.map(buildCard).join('\n        ')}
      </div>
    </div>
  </section>`;
}

function buildCharacterList(items, isMain = false) {
  return items.map(name => `<li${isMain ? ' class="is-main-char"' : ''}>${name}</li>`).join('\n');
}

function buildCharacterSection() {
  const { books: b, films: f } = characters;
  return `<section class="info-section">
    <div class="container">
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
    <div class="container">
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

export function renderSections() {
  const main = document.querySelector('main');
  if (!main) return;

  main.innerHTML = `
    ${buildScrollSection('Cressida Cowell', 'Books', books)}
    ${buildScrollSection('DreamWorks Animation', 'Films', films)}
    ${buildScrollSection('DreamWorks Animation', 'Shows', shows)}
    ${buildScrollSection('Short Films &amp; Specials', 'Specials', specials)}
    ${buildCharacterSection()}
    ${buildLibrarySection()}
  `;
}