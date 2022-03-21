const angular = require("angular");
module.exports = RestangularConfig;

RestangularConfig.$inject = ['$cookies', 'Restangular', '$state'];

function RestangularConfig($cookies, Restangular, $state) {
  return {
    init: _init
  };

  function _getUserInfo() {
    return angular.fromJson($cookies.get('userCredentials'));
  }

  function _init() {
    Restangular.setDefaultHeaders({Authorization: _getUserInfo().jwt});
    _setJwtErrorInterceptor();
  }

  function _setJwtErrorInterceptor() {
    Restangular.setErrorInterceptor((response) => {
      if (response.data.message === 'JWT_NOT_VALID') $state.go('login');
    });
    return true;
  }
}
