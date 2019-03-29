function getUniqArrItems(items) {
  var results = [];

  items.forEach(value => {
    if (results.indexOf(value) === -1) {
      results.push(value);
    }
  });

  return results;
}

module.exports = getUniqArrItems;
