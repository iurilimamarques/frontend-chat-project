var template = require("./email-validation.html");
var controller = require("./email-validation.controller");

module.exports = directive;

directive.$inject = [];

function directive() {
  return {
    template: template,
    controller: controller,
    controllerAs: 'vm'
  }
}
