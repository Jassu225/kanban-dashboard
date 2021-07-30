const format = (date, options) =>
  new Intl.DateTimeFormat(window.navigator.language || 'en-IN', options).format(
    date
  );
