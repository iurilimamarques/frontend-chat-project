const angular = require('angular');
require('../../../node_modules/ui-select/dist/select.css');
require('../../../content/styles/select2-chat-app-fix.css');

module.exports = angular
  .module('select2ChatApp',[
    require('ui-select')
  ])
  .directive('select2ChatApp', require('./select2-chat-app.directive'))
  .service('SelectService', require('./service')).name;
