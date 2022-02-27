module.exports = contactService;

contactService.$inject = ['Restangular', 'URL_API_CHATAPP'];

function contactService(Restangular, URL_API_CHATAPP) {
  const path = 'chat/contact';

  return {
    getActiveContacts: _getActiveContacts,
    saveContact: _saveContact
  }

  function _getActiveContacts() {
    return Restangular.allUrl('chat-app', URL_API_CHATAPP)
        .all(`${path}/active-contacts`)
        .customGET();
  }

  function _saveContact(contact) {
    return Restangular.allUrl('chat-app', URL_API_CHATAPP)
        .all(path)
        .customPOST(contact);
  }
}
