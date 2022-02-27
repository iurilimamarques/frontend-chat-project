module.exports = service;

service.$inject = ['Restangular', 'URL_API_CHATAPP'];

function service(Restangular, URL_API_CHATAPP) {
  const path = 'chat/user';

  return {
    searchUser: _searchUser
  }

  function _searchUser(params) {
    return Restangular.allUrl('chat-app', URL_API_CHATAPP)
        .all(path)
        .customGET(null, params);
  }
}
