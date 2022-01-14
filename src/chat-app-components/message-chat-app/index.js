const angular = require('angular');

module.exports = angular
  .module('messageChatApp', [])
  .directive('scrollToBottom', require('../../chat-app-components/scroll-to-bottom'))
  .directive('messageChatApp', require('./message-chat-app.directive'))
  .controller('MessageChatAppController', require('./message-chat-app.controller'))
  .service('MessageChatAppService', require('./service')).name;
