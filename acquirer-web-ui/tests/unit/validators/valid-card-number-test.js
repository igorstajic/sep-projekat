import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:valid-card-number', 'Unit | Validator | valid-card-number', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
