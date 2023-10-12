import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabayApi';
import { clearMarkup, createCardMarkup } from './js/markupHelpers';
import { createNotify } from './js/notifyHelpers';
import { handleScrollEffects, scrollBy, scrollUp } from './js/scroll';
import { createLoadMoreObserver } from './js/observers';

const refs = {
  userForm: document.getElementById('search-form'),
  gallery: document.getElementById('gallery'),
  loadMoreBtn: document.querySelector('.js-load-more'),
  upBtn: document.getElementById('button-up'),
  fixedWrapper: document.querySelector('.form-wrapper'),
};

let page = 1;
const perPage = 40;

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionClass: 'gallery__caption',
  overlayOpacity: 0.9,
  fadeSpeed: 350,
});

refs.userForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.upBtn.addEventListener('click', scrollUp);
window.addEventListener('scroll', () =>
  handleScrollEffects(refs.fixedWrapper, refs.upBtn)
);

clearMarkup(refs.gallery, refs.loadMoreBtn);

function onSearch(event) {
  event.preventDefault();
  clearMarkup(refs.gallery, refs.loadMoreBtn);
  const query = event.currentTarget.elements.searchQuery.value.trim();
  if (!query || query === ' ') {
    createNotify('info');
    return;
  }
  page = 1;
  fetchImages(query, page, perPage)
    .then(images => {
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        createCardMarkup(images.hits)
      );
      images.totalHits > 0 && images.hits.length > 0
        ? createNotify('success', images.totalHits)
        : createNotify('failure-no-matching');

      if (images.totalHits > perPage && images.hits.length > 0) {
        refs.loadMoreBtn.classList.replace('is-hidden', 'load-more');
      }
      lightbox.refresh();
    })
    .catch(error => {
      console.error('Помилка під час запиту:', error);
      createNotify('failure-general');
    });
}

function onLoadMore({ target }) {
  page += 1;
  target.disabled = true;
  const query = refs.userForm.elements.searchQuery.value.trim();
  const firstChild = refs.gallery.firstElementChild;
  if (!firstChild) {
    return;
  }

  fetchImages(query, page, perPage)
    .then(images => {
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        createCardMarkup(images.hits)
      );
      const { height: cardHeight } = firstChild.getBoundingClientRect();

      lightbox.refresh();
      scrollBy(cardHeight);

      if (images.totalHits - page * perPage <= 0) {
        refs.loadMoreBtn.classList.replace('load-more', 'is-hidden');
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
      target.disabled = false;
    });
}
