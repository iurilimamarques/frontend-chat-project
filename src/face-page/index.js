const angular = require('angular');

module.exports = angular
    .module('chat-app-face-page', [
      require('./login'),
      require('./sign-up'),
      require('./email-validation')
    ])
    .service('ServiceAuthentication', require('./service/authentication.service')).name;
