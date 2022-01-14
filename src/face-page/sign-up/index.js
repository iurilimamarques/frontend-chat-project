const angular = require('angular');

module.exports = angular
  .module('signUp', [])
  .directive('signUp', require('./directive/sign-up.directive')).name;
  