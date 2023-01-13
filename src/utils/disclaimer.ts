import { simulateEvent } from '@finsweet/ts-utils';

export const DISCLAIMER = () => {
  const COMPONENT = document.querySelector('[data-disclaimer="component"]');
  if (!COMPONENT) return;

  let isValid = false;
  const SELECT = COMPONENT.querySelector('select[data-disclaimer="select"]'),
    OPEN = COMPONENT.querySelector('[data-disclaimer="open"]'),
    DECLINE = COMPONENT.querySelector('[data-disclaimer="decline"]'),
    AGREE = COMPONENT.querySelector('[data-disclaimer="agree"]'),
    ACCEPTED = [
      'United Kingdom',
      'Guernsey',
      'Isle of Man',
      'Jersey',
      'Sweden',
      'The Republic of Ireland',
    ];

  if (sessionStorage.getItem('disclaimer')) return;
  simulateEvent(OPEN, 'click');
  document.body.style.overflow = 'hidden';

  const TOGGLE_BUTTON = (button, enabled) => {
    button.style.opacity = enabled ? '1' : '0.5';
    button.style.pointerEvents = enabled ? 'auto' : 'none';
    button.setAttribute('tabindex', enabled ? '0' : '-1');
    isValid = enabled;
  };

  TOGGLE_BUTTON(DECLINE, true);
  TOGGLE_BUTTON(AGREE, false);

  const SELECT_CONFIG = {
      element: SELECT,
      next: DECLINE,
      previous: DECLINE,
    },
    DECLINE_CONFIG = {
      element: DECLINE,
      next: SELECT,
      previous: SELECT,
    },
    AGREE_CONFIG = {
      element: AGREE,
      next: SELECT,
      previous: DECLINE,
    },
    tabbable = [SELECT_CONFIG, DECLINE_CONFIG, AGREE_CONFIG];

  setTimeout(() => {
    tabbable[0].element.focus();
    tabbable.forEach((item) => {
      item.element.addEventListener('keydown', (event) => {
        if (event.which !== 9) return;
        event.preventDefault();
        // if shifting forward
        if (!event.shiftKey) item.next.focus();

        // if shifting backward
        if (event.shiftKey) item.previous.focus();
      });
    });
  }, 500);

  SELECT.addEventListener('change', () => {
    TOGGLE_BUTTON(AGREE, ACCEPTED.includes(SELECT.value));
    SELECT_CONFIG.previous = isValid ? AGREE : DECLINE;
    DECLINE_CONFIG.next = isValid ? AGREE : SELECT;
  });

  AGREE.addEventListener('keyup', (event) => {
    if (event.which === 13) simulateEvent(AGREE, 'click');
  });

  DECLINE.addEventListener('keyup', (event) => {
    if (event.which === 13) simulateEvent(DECLINE, 'click');
  });

  AGREE.addEventListener('click', () => {
    if (!isValid) return;
    sessionStorage.setItem('disclaimer', 'true');
    document.body.style.removeProperty('overflow');
    setTimeout(() => {
      COMPONENT.remove();
    }, 350);
  });

  DECLINE.addEventListener('click', () => {
    window.location.replace('https://www.downing.co.uk/');
  });
};
