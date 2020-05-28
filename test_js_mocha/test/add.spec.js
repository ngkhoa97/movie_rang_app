const { deepEqual, equal } = require('assert');
const addUtility = require('../add.js');

// eslint-disable-next-line no-undef
describe('Add', () => {
  // eslint-disable-next-line no-undef
  describe('addUtility', () => {
    // eslint-disable-next-line no-undef
    it('should have a sum method', () => {
      equal(typeof addUtility, 'object');
      equal(typeof addUtility.sum, 'function');
    });

    // eslint-disable-next-line no-undef
    it('addUtility.sum(5, 4) should return 9', () => {
      deepEqual(addUtility.sum(5, 4), 9);
    });
  });
});
