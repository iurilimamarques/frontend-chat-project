const angular = require('angular');

module.exports = angular
  .module('messagePage', [
    require('ui-select'),
    require('angular-sanitize'),
    require('../chat-app-components/select2-chat-app'),
    require('../chat-app-components/message-chat-app')
  ])
  .directive('messagePage', require('./directive/message-page.directive'))
  .service('MessageService', require('./service/service'))
  .factory('RestangularConfig', require('../restangular-config'))
  .constant('SockJS', require('sockjs-client'))
  .constant('Stomp', require('stompjs/lib/stomp.js').Stomp)
  .config(require('./message-page.states')).name;
