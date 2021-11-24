const {format, parseISO} = require('date-fns');

module.exports = {
  formatDate: (date) => {
      return format(date, 'do MMM yyyy')
  }
};
