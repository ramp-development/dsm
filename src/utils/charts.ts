export const INIT_CHART = (CHART_WRAPPER) => {
  const CHART_ATTRIBUTE = 'data-chart-item';
  const CANVAS = CHART_WRAPPER.querySelector(`[${CHART_ATTRIBUTE}="chart"]`),
    LIST = CHART_WRAPPER.querySelector(`[${CHART_ATTRIBUTE}="list"]`),
    ITEMS = [...LIST.querySelectorAll(`[${CHART_ATTRIBUTE}="item"]`)];

  const LABELS = ITEMS.map((ITEM) => {
    const LABEL = ITEM.querySelector(`[${CHART_ATTRIBUTE}="label"]`);
    return LABEL.textContent;
  });

  const BACKGROUND_COLOURS = ITEMS.map((ITEM) => {
    const LABEL = ITEM.querySelector(`[${CHART_ATTRIBUTE}="background-colour"]`);
    const STYLES = window.getComputedStyle(LABEL);
    return STYLES.getPropertyValue('color');
  });

  const VALUES = ITEMS.map((ITEM) => {
    const LABEL = ITEM.querySelector(`[${CHART_ATTRIBUTE}="value"]`);
    return LABEL.textContent;
  });

  const CHART = new Chart(CANVAS, {
    type: 'doughnut',
    data: {
      labels: LABELS,
      datasets: [
        {
          label: CHART_WRAPPER.dataset.chartLabel,
          backgroundColor: BACKGROUND_COLOURS,
          data: VALUES,
        },
      ],
    },
  });
};
