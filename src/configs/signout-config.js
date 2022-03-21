const angular = require("angular");

module.exports = SignoutConfig;

SignoutConfig.$inject = ['$cookies', '$rootScope', '$injector'];

function SignoutConfig($cookies, $rootScope, $injector) {

  const WebsocketService = $injector.get('WebsocketService');
  const ServiceAuthentication = $injector.get('ServiceAuthentication');
  let cleanUpFunc;
  let stateInitialized = false;

  return {
    init: _init
  };

  function _init() {
    if (!stateInitialized) {
      cleanUpFunc = $rootScope.$on('$stateChangeSuccess', _onStateChange);
      stateInitialized = true;
    }
  }

  function _onStateChange(ev, to) {
    if (to.name === 'login') {
      if (WebsocketService.isConnected()) WebsocketService.disconnect();
      _signout();
    }
  }

  function _signout() {
    ServiceAuthentication.userSignout().then(() => {
      cleanUpFunc();
      _clearCookies();
      stateInitialized = false;
    });
  }

  function _clearCookies() {
    $cookies.remove('userCredentials');
  }
}
