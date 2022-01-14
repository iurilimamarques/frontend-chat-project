module.exports = factory;

factory.$inject = ['$rootScope'];

function factory($rootScope) {
  var service = {
    model: {
      id: 0,
      name: '',
      email: ''
    },

    SaveState: function () {
      sessionStorage.userService = angular.toJson(service.model);
    },

    RestoreState: function () {
      service.model = angular.fromJson(sessionStorage.userService);
    }
  }

  $rootScope.$on('saveState', service.SaveState);
  $rootScope.$on('restoreState', service.RestoreState);

  return service;
}
