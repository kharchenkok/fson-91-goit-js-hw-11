import { Notify } from 'notiflix/build/notiflix-notify-aio';
function createNotify(type, total = 0) {
  switch (type) {
    case 'info':
      Notify.info('Please enter search parameters');
      break;
    case 'info-end-results':
      Notify.info("We're sorry, but you've reached the end of search results.");
      break;
    case 'success':
      Notify.success(`Hooray! We found ${total} images.`);
      break;
    case 'failure-no-matching':
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      break;
    case 'failure-general':
      Notify.failure('Oops! Something went wrong! Try reloading the page');
      break;
    default:
      console.error('Unknown notification type:', type);
      break;
  }
}
export { createNotify };
