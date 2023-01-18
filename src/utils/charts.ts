export const INIT_CHART = (CHART_WRAPPER) => {
  const CHART_ATTRIBUTE = 'data-chart-item';
  const CANVAS = CHART_WRAPPER.querySelector(`[${CHART_ATTRIBUTE}="chart"]`),
    LIST = CHART_WRAPPER.querySelector(`[${CHART_ATTRIBUTE}="list"]`),
    ITEMS = [...LIST.querySelectorAll(`[${CHART_ATTRIBUTE}="item"]`)];

  const VALUES = ITEMS.map((ITEM) => {
    const LABEL = ITEM.querySelector(`[${CHART_ATTRIBUTE}="value"]`);
    return LABEL.textContent;
  });

  const TOTAL = VALUES.reduce((ACCUMULATOR, CURRENT) => Number(ACCUMULATOR) + Number(CURRENT));

  const LABELS = ITEMS.map((ITEM, INDEX) => {
    const LABEL = ITEM.querySelector(`[${CHART_ATTRIBUTE}="label"]`);
    return `${Math.round((VALUES[INDEX] / TOTAL) * 100)}% ${LABEL.textContent}`;
  });

  const BACKGROUND_COLOURS = ITEMS.map((ITEM) => {
    const LABEL = ITEM.querySelector(`[${CHART_ATTRIBUTE}="background-colour"]`);
    const STYLES = window.getComputedStyle(LABEL);
    return STYLES.getPropertyValue('background-color');
  });

  const CHART = new Chart(CANVAS, {
    type: 'doughnut',
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '75%',
      plugins: {
        legend: {
          display: false,
        },
      },
    },
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
