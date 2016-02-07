import {
  moduleFor, test
}
from 'ember-qunit';

moduleFor('validator:is-true', 'Unit | Validator | is-true', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  assert.expect(2);

  let validator = this.subject();

  assert.equal(validator.validate(true), true, 'Vaild when true.');
  assert.equal(validator.validate(false), false, 'Invalid when false.');

});
