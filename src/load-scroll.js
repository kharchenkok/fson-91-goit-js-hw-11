import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabayApi';
import { clearMarkup, createCardMarkup } from './js/markupHelpers';
import { createNotify } from './js/notifyHelpers';
import { handleScrollEffects, scrollUp } from './js/scroll';
import { hideLoader, showLoader } from './js/loader';
import { createLoadMoreObserver } from './js/observers';

const refs = {
  userForm: document.getElementById('search-form-scroll'),
  gallery: document.getElementById('gallery-scroll'),
  upBtn: document.getElementById('button-up-scroll'),
  fixedWrapper: document.querySelector('.js-form-wrapper-scroll'),
  loadingIndicator: document.getElementById('loading-indicator'),
  loader: document.getElementById('loader'),
};

let page = 1;
const perPage = 40;
let searchPerformed = false;

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionClass: 'gallery__caption',
  overlayOpacity: 0.9,
  fadeSpeed: 350,
});

refs.userForm.addEventListener('submit', onSearch);
refs.upBtn.addEventListener('click', scrollUp);
window.addEventListener('scroll', () =>
  handleScrollEffects(refs.fixedWrapper, refs.upBtn)
);

clearMarkup(refs.gallery);

function onSearch(event) {
  event.preventDefault();
  clearMarkup(refs.gallery);
  const query = event.currentTarget.elements.searchQuery.value.trim();
  if (!query || query === ' ') {
    createNotify('info');
    refs.loadingIndicator.classList.add('is-hidden');
    return;
  }

  page = 1;
  searchPerformed = false;

  showLoader(refs.loader);

  fetchImages(query, page, perPage)
    .then(images => {
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        createCardMarkup(images.hits)
      );
      images.totalHits > 0 && images.hits.length > 0
        ? createNotify('success', images.totalHits)
        : createNotify('failure-no-matching');

      lightbox.refresh();
      refs.loadingIndicator.classList.remove('is-hidden');
    })
    .catch(error => {
      console.error('Помилка під час запиту:', error);
      createNotify('failure-general');
    })
    .finally(() => {
      hideLoader(refs.loader);
      searchPerformed = true;
    });
}

function loadNextPage() {
  if (!searchPerformed) {
    return;
  }
  showLoader(refs.loader);
  page += 1;
  const query = refs.userForm.elements.searchQuery.value.trim();

  fetchImages(query, page, perPage)
    .then(images => {
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        createCardMarkup(images.hits)
      );

      lightbox.refresh();

      if (images.totalHits - page * perPage <= 0) {
        refs.loadingIndicator.classList.add('is-hidden');
        createLoadMoreObserver(() => {
          createNotify('info-end-results');
        }, refs.gallery.lastElementChild);
      }
    })
    .catch(error => {
      console.error('Помилка під час запиту:', error);
      createNotify('failure-general');
    })
    .finally(() => {
      hideLoader(refs.loader);
    });
}

createLoadMoreObserver(loadNextPage, refs.loadingIndicator);
