const angular = require('angular');

module.exports = angular
    .module('email-validation', [])
    .directive('capitalizeInput', require('../../chat-app-components/capitalize-input'))
    .directive('moveNextOnMaxLength', require('../../chat-app-components/move-next-on-max-length'))
    .directive('emailValidation', require('./directive/email-validation.directive')).name;
