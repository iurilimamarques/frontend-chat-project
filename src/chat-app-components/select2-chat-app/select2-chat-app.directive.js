const template = require('./select2-chat-app.html');

module.exports = directive;

directive.$inject = [];

function directive() {
  return {
    restrict: 'E',
    template: template,
    controller: 'select2ChatAppCtrl',
    controllerAs: 'vm',
    scope: {},
    bindToController: {
      ngModel: '=',
      selectedUsers: '='
    }
  }
}
