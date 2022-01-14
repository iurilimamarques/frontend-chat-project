let template = require('./message-chat-app.html');

module.exports = directive;

directive.$inject = [];

function directive() {
  return {
    restrict: 'E',
    template: template,
    controller: 'MessageChatAppController',
    controllerAs: 'vm',
    scope: {},
    bindToController: {
      recipient: '=?',
      sendMessage: '=?'
    }
  };
}
