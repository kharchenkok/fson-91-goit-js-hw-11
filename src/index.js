import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImages } from './js/pixabayApi';
import { clearMarkup, createCardMarkup } from './js/markupHelpers';

const refs = {
  userForm: document.getElementById('search-form'),
  gallery: document.getElementById('gallery'),
  loadMoreBtn: document.querySelector('.js-load-more'),
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

clearMarkup(refs.gallery, refs.loadMoreBtn);

function onSearch(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.searchQuery.value;
  clearMarkup(refs.gallery, refs.loadMoreBtn);
  fetchImages(query, page, perPage)
    .then(images => {
      console.log(images);

      refs.gallery.insertAdjacentHTML(
        'beforeend',
        createCardMarkup(images.hits)
      );
      images.totalHits && images.totalHits > 0
        ? Notify.success(`Hooray! We found ${images.totalHits} images.`)
        : Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );

      lightbox.refresh();
      if (images.totalHits > perPage) {
        refs.loadMoreBtn.classList.replace('load-more-hidden', 'load-more');
      }
    })
    .catch(error => {
      console.error('Помилка під час запиту:', error);
      Notify.failure('Oops! Something went wrong! Try reloading the page');
    })
    .finally(() => {
      // refs.loader.classList.add('is-hidden');
    });
  // console.log(event.currentTarget.elements.input);
}

function onLoadMore() {
  page += 1;
  const query = refs.userForm.elements.searchQuery.value;
  fetchImages(query, page, perPage)
    .then(images => {
      console.log(images);
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        createCardMarkup(images.hits)
      );
      lightbox.refresh();
      // window.scrollTo({
      //   top: document.documentElement.offsetHeight,
      //   behavior: 'smooth',
      // });
      const { height: cardHeight } =
        refs.gallery.firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
      if (images.totalHits - page * perPage <= 0) {
        refs.loadMoreBtn.classList.replace('load-more', 'load-more-hidden');
      }
    })
    .catch(error => {
      console.error('Помилка під час запиту:', error);
      Notify.failure('Oops! Something went wrong! Try reloading the page');
    })
    .finally(() => {
      // refs.loader.classList.add('is-hidden');
    });
}

// function lightboxInit() {
//   // if (lightbox) {
//   //   lightbox.destroy();
//   // }
//   lightbox = new SimpleLightbox('.gallery a', {
//     captionsData: 'alt',
//     captionDelay: 250,
//     captionClass: 'gallery__caption',
//     overlayOpacity: 0.9,
//     fadeSpeed: 350,
//   });
//   lightbox.refresh();
// }
