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
              </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>${likes}
              </p>
              <p class="info-item">
                <b>Views </b> ${views}
              </p>
              <p class="info-item">
                <b>Comments</b> ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>${downloads}
              </p>
            </div>
          </div>
        `;
      }
    )
    .join('');
}

function clearMarkup(gallery, btn) {
  gallery.innerHTML = '';
  btn.classList.replace('load-more', 'load-more-hidden');
}

export { createCardMarkup, clearMarkup };
