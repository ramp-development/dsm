import * as utils from './utils';

window.Webflow ||= [];
window.Webflow.push(() => {
  utils.DISCLAIMER();
  utils.NAV();

  const { pathname } = window.location;
  if (pathname.includes('the-company')) {
    const CHART_WRAPPERS = [...document.querySelectorAll('[data-chart-item="wrapper"]')];
    CHART_WRAPPERS.forEach((WRAPPER) => {
      utils.INIT_CHART(WRAPPER);
    });
  }
  if (pathname.includes('resources')) utils.RESET_COLLECTION();
});
