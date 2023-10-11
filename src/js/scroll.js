function scrollBy(elemHeight) {
  window.scrollBy({
    top: elemHeight * 2,
    behavior: 'smooth',
  });
}

function scrollUp() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export { scrollBy, scrollUp };
