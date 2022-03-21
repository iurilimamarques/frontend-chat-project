const angular = require('angular');

module.exports = Controller;

Controller.$inject = ['$state', '$rootScope', '$injector', 'promiseTracker', '$cookies'];

function Controller($state, $rootScope, $injector, promiseTracker, $cookies) {
  let vm = this;

  const ServiceAuthentication = $injector.get('ServiceAuthentication');

  vm.tracker = {
    loginUser: promiseTracker()
  };

  vm.userSignin = _userSignin;

  function _userSignin() {
    vm.tracker.loginUser.addPromise(
      ServiceAuthentication.userSignin(vm.userCredentials).then(response => {
        let userCredentials = {
          id: response.id,
          email: response.username,
          jwt: response.token,
          name: response.name
        };

        $cookies.put('userCredentials', angular.toJson(userCredentials));

        $rootScope.$broadcast('saveState');
        $state.go('chat-app');
      }, function(error) {
        if (error.data.message === 'USER_VALIDATION') {
          let userCredentials = {
            username: vm.userCredentials.email
          };

          $cookies.put('userCredentials', angular.toJson(userCredentials));
          $state.go('email-validation');
        }
        vm.messageError = error.data.message;
      })
    );
  }

  (function() {
    vm.userCredentials = {};
  })();
}
