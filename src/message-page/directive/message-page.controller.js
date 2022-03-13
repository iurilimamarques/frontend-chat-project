const angular = require('angular');

module.exports = Controller;

Controller.$inject = ['SockJS', 'Stomp', '$scope', '$cookies', '$injector'];

function Controller(SockJS, Stomp, $scope, $cookies, $injector) {
  let vm = this;
  let ContactService = $injector.get('ContactService');
  let WebsocketService = $injector.get('WebsocketService');

  vm.selectContact = _selectContact;
  vm.isObjectEmpty = _isObjectEmpty;

  vm.contacts = {
    list: []
  };
  vm.hashedContacts = {};
  vm.selectedContact = {};
  vm.userSearch = {};
  vm.newMessages = {};

  $scope.$on('onSelectUser', _onSelectUser);
  $scope.$on('newMessage', _updateContact);

  function _updateContact(event, data) {
    if (_isFirstMessage(data)){
      _addContactToList(data);
    } else {
      vm.hashedContacts[data.contact.id].updatedIn = data.contact.updatedIn;
    }
    $scope.$apply();
  }

  function _addContactToList(data) {
    let newContact = _buildNewContact(data);
    vm.contacts.list.push(newContact);
    _buildHashedList();
  }

  function _buildNewContact(data) {
    return {
      id: data.contact.id,
      user: data.userSender,
      updatedIn: data.contact.createdIn,
      createdIn: data.contact.createdIn
    };
  }

  function _isFirstMessage(data) {
    return !vm.hashedContacts[data.contact.id];
  }

  function _selectContact(item) {
    vm.selectedContact = item;
  }

  function _onSelectUser(event, data) {
    _createContact(data);
  }

  function _createContact(selectedUser) {
    let contactBody = _builldContact(selectedUser);
    ContactService.saveContact(contactBody).then(response => {
      _selectContact(response.plain());
      vm.contacts.list.push(response.plain());
      _buildHashedList();
    });
  }

  function _builldContact(selectedUser) {
    return {
      userB: _buildUserRecipient(selectedUser)
    };
  }

  function _buildUserRecipient(selectedUser) {
    return {
      id: selectedUser.id,
      name: selectedUser.name,
      email: selectedUser.email
    }
  }

  function _isObjectEmpty(object) {
    return angular.equals({}, object);
  }

  function _defineUserInformation() {
    vm.user = _getUserInfo();
  }

  function _getContacts() {
    ContactService.getActiveContacts().then(response => {
      vm.contacts.list = response.plain();
      _buildHashedList();
    });
  }

  function _buildHashedList() {
    vm.contacts.list.forEach(item => vm.hashedContacts[item.id] = item);
  }

  function _getUserInfo() {
    return angular.fromJson($cookies.get('userCredentials'));
  }

  (function _init() {
    WebsocketService.connectUser();
    _defineUserInformation();
    _getContacts();
  })();
}
