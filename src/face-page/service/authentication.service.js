module.exports = authenticationService;

authenticationService.$inject = ['Restangular', 'URL_API_CHATAPP'];

function authenticationService(Restangular, URL_API_CHATAPP) {
  const path = 'auth';

  return {
    userLogin: _userLogin,
    saveUser: _saveUser,
    sendCode: _sendCode
  }

  function _userLogin(userCredentials) {
    return Restangular.allUrl('chat-app', URL_API_CHATAPP)
        .all(`${path}/signin`)
        .customPOST(userCredentials);
  }

  function _saveUser(userCredentials) {
    return Restangular.allUrl('chat-app', URL_API_CHATAPP)
        .all(`${path}/signup`)
        .customPOST(userCredentials);
  }

  function _sendCode(params) {
    return Restangular.allUrl('chat-app', URL_API_CHATAPP)
        .all(`${path}/validate`)
        .customGET(null, params);
  }
}
