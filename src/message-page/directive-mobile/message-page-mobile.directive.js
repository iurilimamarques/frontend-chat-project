const controller = require('./message-page-mobile.controller');
const template = require('./message-page-mobile.html');

module.exports = directive;

directive.$inject = [];

function directive() {
  return {
    restrict: 'E',
    template: template,
    controller: controller,
    controllerAs: 'vm',
    scope: {}
  };
}
