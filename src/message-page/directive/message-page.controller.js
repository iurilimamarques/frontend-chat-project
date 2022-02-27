const angular = require('angular');

module.exports = Controller;

Controller.$inject = ['SockJS', 'Stomp', '$rootScope', '$scope', '$cookies', '$injector'];

function Controller(SockJS, Stomp, $rootScope, $scope, $cookies, $injector) {
  let vm = this;
  let stompClient = {};
  let RestangularConfig = $injector.get('RestangularConfig');
  let ContactService = $injector.get('ContactService');

  vm.selectContact = _selectContact;
  vm.isObjectEmpty = _isObjectEmpty;
  vm.sendMessage = _sendMessage;

  vm.contacts = [];
  vm.selectedContact = {};
  vm.userSearch = {};
  vm.newMessages = {};

  RestangularConfig.init();

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
      vm.contacts.unshift(response.plain());
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
      vm.contacts = response.plain();
    });
  }

  function _connectUser(userInfo) {
    // let ws = SockJS(`${process.env.BASE_URL_WEBSOCKET}/chat`);
    let ws = SockJS(`http://localhost:8082/chat`);

    stompClient = Stomp.over(ws);

    stompClient.connect({email: userInfo.email}, function () {
      _messageSubscriber();
      _updateChecker();
    }, function (err) {
      console.log(err);
    });
  }

  function _isknownUser(item, fromUserId) {
    return item.id == fromUserId;
  }

  function _verifyActiveChats(fromUserId) {
    let knownUser = vm.activeChats.find(a => _isknownUser(a, fromUserId));
    if(!knownUser) _getContacts();
  }

  function _messageSubscriber() {
    stompClient.subscribe('/user/queue/messages', function (output) {
      let incomingMessage = angular.fromJson(output.body);
      console.log(incomingMessage)
      // _verifyActiveChats(incomingMessage.fromUser.id);
      $scope.$broadcast('newMessage', incomingMessage);
    });
  }

  function _updateChecker() {
    stompClient.subscribe('/topic/active', function () {
      console.log('updating....')
    });
  }

  function _sendMessage(payload) {
    stompClient.send("/app/chat", {'sender': payload.fromUser},
      angular.toJson(payload));
  }

  function _getUserInfo() {
    return angular.fromJson($cookies.get('userCredentials'));
  }

  $rootScope.$on('onSelectUser', _onSelectUser);

  (function _init() {
    _defineUserInformation();
    _connectUser(_getUserInfo());
    _getContacts();
  })();
}
