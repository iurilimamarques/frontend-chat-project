const angular = require('angular');
require('../node_modules/bootstrap/dist/css/bootstrap.css');
require('../content/styles/styles-chat-app.css');
require('../content/styles/form-dark.css');

module.exports = angular
    .module('chatApp', [
      require('angular-ui-router'),
      require('./face-page'),
      require('./message-page'),
      require('restangular'),
      require('angular-promise-tracker').name || 'ajoslin.promise-tracker',
      require('angular-cookies')
    ])
    .constant('URL_API_CHATAPP', process.env.GATEWAY_URL || 'http://localhost:8080/chat-app/api/')
    .config(require('./index.states')).name;
