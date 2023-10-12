export function createLoadMoreObserver(callback, element) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      callback();
    }
  });
  observer.observe(element);
}
