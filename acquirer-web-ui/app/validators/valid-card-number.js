import BaseValidator from 'ember-cp-validations/validators/base';

export default BaseValidator.extend({
  validate(value) {
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) {
      return false;
    }
    // The Luhn Algorithm. It's so pretty.
    var nCheck = 0;
    var nDigit = 0;
    var bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
      var cDigit = value.charAt(n);
      nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) {
          nDigit -= 9;
        }
      }

      nCheck += nDigit;
      bEven = !bEven;
    }
    if ((nCheck % 10) === 0) {
      console.log('test');
      return true;
    } else {
      return 'Invalid credit card number.';
    }
  }
});
