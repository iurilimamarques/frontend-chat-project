const angular = require('angular');
require('../../content/styles/sidebar/sidebar-responsive-2-1.css');
require('../../content/styles/sidebar/sidebar-responsive-2.css');
require('../../content/styles/sidebar/soft-ui-aside-navbar.css');
require('../../content/styles/message-default.css');
require('../../content/styles/message-mobile.css');

module.exports = angular
  .module('messagePage', [
    require('ui-select'),
    require('angular-sanitize'),
    require('../chat-app-components/select2-chat-app'),
    require('../chat-app-components/message-chat-app')
  ])
  .directive('messagePage', require('./directive/message-page.directive'))
  .directive('messagePageMobile', require('./directive-mobile/message-page-mobile.directive'))
  .service('ContactService', require('./service/contact.service'))
  .service('WebsocketService', require('./service/websocket.service'))
  .factory('RestangularConfig', require('../configs/restangular-config'))
  .factory('SignoutConfig', require('../configs/signout-config'))
  .constant('SockJS', require('sockjs-client'))
  .constant('Stomp', require('stompjs/lib/stomp.js').Stomp)
  .config(require('./message-page.states')).name;
