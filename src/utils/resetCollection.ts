import { simulateEvent } from '@finsweet/ts-utils';

export const RESET_COLLECTION = () => {
  const COLLECTION = document.querySelector('.collection-wrapper');
  const RESET = COLLECTION?.querySelector('form [fs-cmsfilter-element="reset"]');
  const TRIGGER = COLLECTION?.querySelector('.resources_empty [fs-cmsfilter-element="reset"]');

  TRIGGER?.addEventListener('click', () => {
    simulateEvent(RESET, 'click');
  });
};
