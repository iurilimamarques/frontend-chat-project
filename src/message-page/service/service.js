module.exports = service;

service.$inject = ['Restangular', 'URL_API_CHATAPP'];

function service(Restangular, URL_API_CHATAPP) {
  const path = 'chat/contact';

  return {
    getActiveContacts: _getActiveContacts
  }

  function _getActiveContacts(loggedUser) {
    return Restangular.allUrl('chat-app', URL_API_CHATAPP)
        .all(`${path}/active-contacts/${loggedUser}`)
        .customGET();
  }
}
