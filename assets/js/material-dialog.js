const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeButton = settingsModal.querySelector('.close-button');
const backdrop = document.getElementById('backdrop');

function openDialog() {
  backdrop.classList.remove('hidden');
  requestAnimationFrame(() => {
    backdrop.classList.add('show');
  });
  
  if (!settingsModal.open) {
    settingsModal.showModal();
    requestAnimationFrame(() => {
      settingsModal.classList.add('open');
      settingsModal.classList.remove('closing');
    });
  }
}

function closeDialog() {
  settingsModal.classList.remove('open');
  settingsModal.classList.add('closing');
  backdrop.classList.remove('show');
  
  setTimeout(() => {
    settingsModal.close();
    backdrop.classList.add('hidden');
  }, 250);
}

settingsButton.addEventListener('click', openDialog);
closeButton.addEventListener('click', closeDialog);

settingsModal.addEventListener('click', e => {
  if (e.target === settingsModal) {
    closeDialog();
  }
});

settingsModal.addEventListener('cancel', e => {
  e.preventDefault();
  closeDialog();
});