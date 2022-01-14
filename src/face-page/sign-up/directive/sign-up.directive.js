var controller = require('./sign-up.controller');
var template = require('./sign-up.html');

module.exports = directive;

directive.$inject = [];

function directive() {
    return {
        template: template,
        controller: controller,
        controllerAs: 'vm'
    }
}
