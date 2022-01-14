var controller = require('./message-page.controller');
var template = require('./message-page.html');

module.exports = directive;

directive.$inject = [];

function directive() {
  return {
    template: template,
    controller: controller,
    controllerAs: 'vm'
  }
}
