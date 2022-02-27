module.exports = service;

service.$inject = ['Restangular', 'URL_API_CHATAPP'];

function service(Restangular, URL_API_CHATAPP) {
  const path = `chat/message`;

  return {
    loadAllMessages: _loadAllMessages
  }

  function _loadAllMessages(contactId) {
    return Restangular.allUrl('chat-app', URL_API_CHATAPP)
        .all(`${path}/load-all-messages/${contactId}`)
        .customGET();
  }
}
