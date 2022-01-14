var controller = require('./login.controller');
var template = require('./login.html');

module.exports = directive;

directive.$inject = [];

function directive() {
    return {
        template: template,
        controller: controller,
        controllerAs: 'vm'
    }
}
