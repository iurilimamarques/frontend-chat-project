const angular = require('angular');

module.exports = angular
  .module('login', [])
  .directive('login', require('./directive/login.directive')).name;
  