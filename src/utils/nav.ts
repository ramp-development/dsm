export const NAV = () => {
  const COMPONENT = document.querySelector('.nav_component');
  if (!COMPONENT) return;
  if (window.scrollY >= 64) COMPONENT.classList.add('is-scrolled');
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 64) {
      COMPONENT.classList.add('is-scrolled');
    } else {
      COMPONENT.classList.remove('is-scrolled');
    }
  });
};
