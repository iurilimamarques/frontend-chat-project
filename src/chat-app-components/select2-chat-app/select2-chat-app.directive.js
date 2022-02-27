const template = require('./select2-chat-app.html');
const angular = require('angular');

module.exports = directive;

directive.$inject = [];

function directive() {
  return {
    restrict: 'E',
    template: template,
    controller: Controller,
    controllerAs: 'vm',
    scope: {},
    bindToController: {
      ngModel: '='
    }
  }
}

Controller.$inject = ['$rootScope', 'SelectService', '$cookies'];

function Controller($rootScope, SelectService, $cookies) {
  let vm = null;
  this.$onInit = function() {
    vm = this;
    vm.searchUser = _searchUser;
    vm.onSelectUser = _onSelectUser;
  }

  function _onSelectUser($select) {
    let userSelected = angular.copy(vm.ngModel.selected);
    delete $select.selected;
    $rootScope.$emit('onSelectUser', userSelected);
  }

  function _searchUser($select) {
    let params = {
      keyWord: $select.search
    };

    SelectService.searchUser(params).then(response => {
      vm.people = response;
    });
  }
}
