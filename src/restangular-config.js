const angular = require("angular");
module.exports = RestangularConfig;

RestangularConfig.$inject = ['$cookies', 'Restangular'];

function RestangularConfig($cookies, Restangular) {
  return {
    init: _init
  };

  function _getUserInfo() {
    return angular.fromJson($cookies.get('userCredentials'));
  }

  function _init() {
    Restangular.setDefaultHeaders({Authorization: _getUserInfo().jwt});
  }
}
