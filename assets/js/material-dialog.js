const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeButton = settingsModal.querySelector('#close-settings');
const resetButton = settingsModal.querySelector('#reset-settings-button');
const backdrop = document.getElementById('backdrop');

function _openDialogInternal() {
  if (!settingsModal) {
    console.error("settingsModal element not found in material-dialog.js");
    return;
  }
  if (!backdrop) {
    console.error("backdrop element not found in material-dialog.js");
    return;
  }
  
  document.body.classList.add('dialog-open'); 
  
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

function _closeDialogInternal() {
  if (!settingsModal) {
    console.error("settingsModal element not found in material-dialog.js");
    return;
  }
  if (!backdrop) {
    console.error("backdrop element not found in material-dialog.js");
    return;
  }
  
  settingsModal.classList.remove('open');
  settingsModal.classList.add('closing');
  backdrop.classList.remove('show');
  
  setTimeout(() => {
    settingsModal.close();
    backdrop.classList.add('hidden');
    settingsModal.classList.remove('closing');

    document.body.classList.remove('dialog-open'); 
    
  }, 250);
}


export function openDialogAsync() {
  return new Promise(resolve => {
    _openDialogInternal();
    const onOpenTransitionEnd = (event) => {
      if (event.target === settingsModal && (event.propertyName === 'opacity' || event.propertyName === 'transform') && settingsModal.classList.contains('open')) {
        settingsModal.removeEventListener('transitionend', onOpenTransitionEnd);
        resolve();
      }
    };
    settingsModal.addEventListener('transitionend', onOpenTransitionEnd);
  });
}

export function closeDialogAsync() {
  return new Promise(resolve => {
    _closeDialogInternal();
    setTimeout(() => {
      resolve();
    }, 250);
  });
}

if (settingsButton) {
  settingsButton.addEventListener('click', _openDialogInternal);
} else {
  console.warn("settingsButton element not found in material-dialog.js. Dialog may not be openable.");
}

if (closeButton) {
  closeButton.addEventListener('click', _closeDialogInternal);
} else {
  console.warn("closeButton element not found in material-dialog.js. Dialog may not be closeable from inside.");
}

if (resetButton) {
  resetButton.addEventListener('click', () => {
    
    const resetEvent = new CustomEvent('resetSettings', {
      detail: {
        theme: 'system',
        font: 'system',
        translucency: true
      }
    });
    
    settingsModal.dispatchEvent(resetEvent);
    console.log("Reset button clicked, custom event 'resetSettings' dispatched.");
  });
} else {
  console.warn("resetButton element not found in material-dialog.js. Reset functionality will not work.");
}

if (settingsModal) {
  settingsModal.addEventListener('click', e => {
    if (e.target === settingsModal) {
      _closeDialogInternal();
    }
  });
  
  settingsModal.addEventListener('cancel', e => {
    e.preventDefault();
    _closeDialogInternal();
  });
} else {
  console.warn("settingsModal element not found in material-dialog.js. Dialog interactions may not work.");
}