const {format, parseISO} = require('date-fns');

module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  formatDate: (date) => {
      console.log(date);
      //return format(parseISO(date), 'do MMM yyyy')
      return format(date, 'do MMM yyyy')
      return
  }

};
