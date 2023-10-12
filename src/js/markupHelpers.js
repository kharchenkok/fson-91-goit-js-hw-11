import iconLike from '../images/icon-like.png';
import iconComment from '../images/icon-comment.png';
import iconDownload from '../images/icon-download.png';
import iconView from '../images/icon-view.png';

function createCardMarkup(galleryItems) {
  return galleryItems
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        webformatHeight,
        webformatWidth,
      }) => {
        return `
            <div class="photo-card">
            <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="${webformatWidth}" height="${webformatHeight}" />

            <div class="info">
              <p class="info-item">
              <img src="${iconLike}" alt="likes" width="30" height="30">
               ${likes}
              </p>
              <p class="info-item">
               <img src="${iconView}" alt="Views" width="30" height="30">
                ${views}
              </p>
              <p class="info-item">
               <img src="${iconComment}" alt="Comments" width="30" height="30">
                 ${comments}
              </p>
              <p class="info-item">
              <img src="${iconDownload}" alt="Downloads" width="30" height="30">
                ${downloads}
              </p>
            </div>
             </a>
          </div>
        `;
      }
    )
    .join('');
}

function clearMarkup(gallery, btn = null) {
  gallery.innerHTML = ' ';
  btn && btn.classList.replace('load-more', 'is-hidden');
}

export { createCardMarkup, clearMarkup };
