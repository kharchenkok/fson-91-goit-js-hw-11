function showLoader(loader) {
  loader.classList.remove('is-hidden');
}

function hideLoader(loader) {
  loader.classList.add('is-hidden');
}

export { showLoader, hideLoader };
