function scrollBy(elemHeight) {
  window.scrollBy({
    top: elemHeight * 2,
    behavior: 'smooth',
  });
}

function scrollUp() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScrollEffects(header, upBtn) {
  const firstScreenHeight = window.innerHeight;

  if (window.scrollY > firstScreenHeight) {
    header.classList.add('fixed');
    upBtn.classList.replace('is-hidden', 'button-up');
  } else {
    header.classList.remove('fixed');
    upBtn.classList.replace('button-up', 'is-hidden');
  }
}

export { scrollBy, scrollUp, handleScrollEffects };
