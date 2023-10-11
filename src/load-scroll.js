import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabayApi';
import { clearMarkup, createCardMarkup } from './js/markupHelpers';
import { createNotify } from './js/notifyHelpers';
import { scrollBy, scrollUp } from './js/scroll';
import { hideLoader, showLoader } from './js/loader';

const refs = {
  userForm: document.getElementById('search-form'),
  gallery: document.getElementById('gallery'),
  upBtn: document.getElementById('button-up'),
  fixedWrapper: document.querySelector('.form-wrapper'),
  loadingIndicator: document.getElementById('loading-indicator'),
  loader: document.getElementById('loader'),
};

let page = 1;
const perPage = 100;
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
window.addEventListener('scroll', toggleScroll);

clearMarkup(refs.gallery);

function onSearch(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.searchQuery.value;
  clearMarkup(refs.gallery);
  if (query.length === 0 || query === ' ') {
    createNotify('info');
    return;
  }

  searchPerformed = true;
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
    })
    .catch(error => {
      console.error('Помилка під час запиту:', error);
      createNotify('failure-general');
    })
    .finally(() => {
      hideLoader(refs.loader);
    });
}

function loadNextPage() {
  if (!searchPerformed) {
    return;
  }
  showLoader(refs.loader);
  page += 1;
  const query = refs.userForm.elements.searchQuery.value;

  fetchImages(query, page, perPage)
    .then(images => {
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        createCardMarkup(images.hits)
      );

      lightbox.refresh();

      if (images.totalHits - page * perPage <= 0) {
        refs.loadingIndicator.classList.add('is-hidden');
        createNotify('info-end-results');
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
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadNextPage();
  }
});

observer.observe(refs.loadingIndicator);
