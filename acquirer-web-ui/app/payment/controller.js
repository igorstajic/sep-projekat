import Ember from 'ember';
import config from 'acquirer-web-ui/config/environment';

export default Ember.Controller.extend({
  isProcessing: false,
  ajax: Ember.inject.service(),
  actions: {
    submitPayment(paymentData) {
      this.set('isProcessing', true);
      const requestData = {
        'cardInfo': {
          'pan': paymentData.get('pan'),
          'securityCode': paymentData.get('securityCode'),
          'cardHolderName': paymentData.get('cardHolderName'),
          'cardExpiryDate': paymentData.get('cardExpiryDate')
        }
      };
      this.get('ajax').post(`${config.APP.acquirerApi}/submit-payment/${paymentData.get('id')}`, {
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(requestData)
      }).then(response => {
        this.set('isProcessing', false);
        window.location.replace(response.redirect.url);
      }).catch(() => {
        this.set('isProcessing', false);
        window.location.replace(paymentData.errorUrl);
      });
    }
  }
});
