console.__proto__.dev = function () {
  if (process.env.NODE_ENV === 'development') console.log(...arguments);
}