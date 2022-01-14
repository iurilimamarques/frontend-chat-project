const angular = require('angular');

module.exports = Controller;

Controller.$inject = ['SockJS', 'Stomp', '$rootScope', '$scope', '$cookies', '$injector'];

function Controller(SockJS, Stomp, $rootScope, $scope, $cookies, $injector) {
  var vm = this;
  let stompClient = {};

  vm.selectChat = _selectChat;
  vm.isObjectEmpty = _isObjectEmpty;
  vm.sendMessage = _sendMessage;

  vm.activeChats = [];
  vm.selectedChat = {};
  vm.userSearch = {};
  vm.newMessages = {};
  let RestangularConfig = $injector.get('RestangularConfig');
  let MessageService = $injector.get('MessageService');

  RestangularConfig.init();

  function _removeClassSelection() {
    for(let i = 0; i <= vm.activeChats.length; i++) {
      let element = angular.element(document.querySelector(`#chat-${i}`));
      element.removeClass('active');
    }
  }

  function _selectChat(index, item) {
    _removeClassSelection();
    let elementSelected = angular.element(document.querySelector(`#chat-${index}`));
    elementSelected.addClass('active');
    vm.selectedChat = item;
  }

  function _onSelectUser(event, data) {
    vm.activeChats.push(data);
  }

  function _isObjectEmpty(object) {
    return angular.equals({}, object);
  }

  function _defineUserInformation() {
    vm.user = _getUserInfo();
  }

  function _getActiveChats() {
    MessageService.getActiveContacts(_getUserInfo().id).then(response => {
      vm.activeChats = response.data;
    });
  }

  function _connectUser(userInfo) {
    let ws = SockJS(`${process.env.BASE_URL_WEBSOCKET}/chat`);

    stompClient = Stomp.over(ws);

    stompClient.connect({username: userInfo.email}, function () {
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
    if(!knownUser) _getActiveChats();
  }

  function _messageSubscriber() {
    stompClient.subscribe('/user/queue/messages', function (output) {
      let incomingMessage = angular.fromJson(output.body);
      _verifyActiveChats(incomingMessage.fromUser.id);
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
    _getActiveChats();
  })();
}
