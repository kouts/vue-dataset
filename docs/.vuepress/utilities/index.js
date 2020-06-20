export const filterList = function (list = [], filter) {
  return list.filter(function (item) {
    for (var key in filter) {
      if (item[key] === undefined || item[key] !== filter[key]) {
        return false;
      }
    }
    return true;
  });
};

export const clone = function (obj) {
  return JSON.parse(JSON.stringify(obj || {}));
};
