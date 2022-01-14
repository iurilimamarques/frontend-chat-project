const angular = require('angular');

module.exports = Controller;

Controller.$inject = ['$state', '$rootScope', '$injector', 'promiseTracker', '$cookies'];

function Controller($state, $rootScope, $injector, promiseTracker, $cookies) {
  let vm = this;

  const ServiceAuthentication = $injector.get('ServiceAuthentication');

  vm.tracker = {
    loginUser: promiseTracker()
  };

  vm.userLogin = _userLogin;

  function _userLogin() {
    vm.tracker.loginUser.addPromise(
      ServiceAuthentication.userLogin(vm.userCredentials).then(response => {
        let userCredentials = {
          id: response.id,
          username: response.username,
          jwt: response.token,
          name: response.name
        };

        $cookies.put('userCredentials', angular.toJson(userCredentials));

        $rootScope.$broadcast('saveState');
        $state.go('chat-app');
      }, function(error) {
        vm.messageError = error.data.message;
      })
    );
  }

  (function() {
    vm.userCredentials = {};
  })();
}
