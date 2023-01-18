export const READ_MORES = (WRAPPERS) => {
  setTimeout(() => {
    WRAPPERS.forEach((WRAPPER) => {
      const TEXT = WRAPPER.querySelector('[data-read-more="text"]');
      const TRIGGER = WRAPPER.querySelector('[data-read-more="trigger"]');

      if (TEXT.scrollHeight > TEXT.offsetHeight) {
        TRIGGER.addEventListener('click', () => {
          TEXT.classList.toggle('text-style-3lines');
          TRIGGER.textContent = TRIGGER.textContent === 'Read more' ? 'Read less' : 'Read more';
        });
      } else {
        TRIGGER.remove();
      }
    });
  }, 250);
};
