const angular = require("angular");
module.exports = Controller;

Controller.$inject = ['promiseTracker', '$injector', '$cookies', '$state', '$timeout'];

function Controller(promiseTracker, $injector, $cookies, $state, $timeout) {
  let vm = this;

  const ServiceAuthentication = $injector.get('ServiceAuthentication');

  vm.codeValidationSucceeded = false;
  vm.codeValidation = {};
  vm.tracker = {
    sendingCode: promiseTracker()
  };

  vm.sendCode = _sendCode;
  vm.codeIsIncomplete = _codeIsIncomplete;

  function _codeIsIncomplete() {
    return !vm.codeValidation.input1 ||
        !vm.codeValidation.input2 ||
        !vm.codeValidation.input3 ||
        !vm.codeValidation.input4 ||
        !vm.codeValidation.input5 ||
        !vm.codeValidation.input6;
  }

  function _buildCode() {
    return `${vm.codeValidation.input1}${vm.codeValidation.input2}${vm.codeValidation.input3}${vm.codeValidation.input4}${vm.codeValidation.input5}${vm.codeValidation.input6}`;
  }

  function _getUserInfo() {
    return angular.fromJson($cookies.get('userCredentials'));
  }

  function _sendCode() {
    let params = {
      username: _getUserInfo().username,
      validationCode: _buildCode()
    };

    vm.tracker.sendingCode.addPromise(
      ServiceAuthentication.sendCode(params).then(() => {
        vm.codeValidationSucceeded = true;
        $timeout(() => {
          $state.go('login');
        }, 2500);
      }, function (error) {
        vm.messageError = error.data.message;
      })
    );
  }
}
