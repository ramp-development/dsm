export const TICKER = (TICKER_ITEMS) => {
  const API_KEY = `AIzaSyA3pHt2H6BylgOG1NNGrr_3UUQVOZrbisI`;
  const SPREADSHEET_ID = `1OYBLYVjn0Jw9cZRLnd6IR6_c-BSsm70U_mF-ik7ZUkA`;

  const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchGet?ranges=%27Stock%20Prices%27&key=${API_KEY}`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const RANGES = data.valueRanges[0].values;
      TICKER_ITEMS.forEach((item) => {
        const ATTRIBUTE = item.dataset.ticker;
        const INDEX = RANGES[0].indexOf(ATTRIBUTE);
        if (INDEX === -1) return;
        item.textContent = RANGES[1][INDEX];
      });
    });
};
