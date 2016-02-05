import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['input-group', 'date'],
  didInsertElement() {
    this.$().datepicker({
    todayBtn: true
});
  }
});
