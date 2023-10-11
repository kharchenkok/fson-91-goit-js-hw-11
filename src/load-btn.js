import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabayApi';
import { clearMarkup, createCardMarkup } from './js/markupHelpers';

import { scrollBy, scrollUp } from './js/scroll';
import { createNotify } from './js/notifyHelpers';

const refs = {
  userForm: document.getElementById('search-form'),
  gallery: document.getElementById('gallery'),
  loadMoreBtn: document.querySelector('.js-load-more'),
  upBtn: document.getElementById('button-up'),
  fixedWrapper: document.querySelector('.form-wrapper'),
};

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionClass: 'gallery__caption',
  overlayOpacity: 0.9,
  fadeSpeed: 350,
});

let page = 1;
const perPage = 40;

refs.userForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.upBtn.addEventListener('click', scrollUp);
clearMarkup(refs.gallery, refs.loadMoreBtn);

function onSearch(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.searchQuery.value;
  clearMarkup(refs.gallery, refs.loadMoreBtn);
  if (query.length === 0 || query === ' ') {
    createNotify('info');
    return;
  }

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
  const query = refs.userForm.elements.searchQuery.value;
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
        createNotify('info-end-results');
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

function toggleScroll() {
  const firstScreenHeight = window.innerHeight;

  if (window.scrollY > firstScreenHeight) {
    refs.fixedWrapper.classList.add('fixed');
    refs.upBtn.classList.replace('is-hidden', 'button-up');
  } else {
    refs.fixedWrapper.classList.remove('fixed');
    refs.upBtn.classList.replace('button-up', 'is-hidden');
  }
}

window.addEventListener('scroll', toggleScroll);
