const angular = require("angular");
module.exports = Controller;

Controller.$inject = ['$state', '$injector', 'promiseTracker', '$cookies'];

function Controller($state, $injector, promiseTracker, $cookies) {
  let vm = this;

  const ServiceAuthentication = $injector.get('ServiceAuthentication');

  vm.tracker = {
    savingUser: promiseTracker()
  };

  vm.saveUser = _saveUser;

  function _saveUser() {
    vm.tracker.savingUser.addPromise(
      ServiceAuthentication.saveUser(vm.userCredentials).then(response => {
        let userCredentials = {
          username: response.email
        };

        $cookies.put('userCredentials', angular.toJson(userCredentials));
        $state.go('email-validation');
      }, function(error) {
        vm.messageError = error.data.message;
      })
    );
  }

  (function() {
    vm.userCredentials = {};
  })();
}
