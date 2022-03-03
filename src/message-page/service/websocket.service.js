const angular = require("angular");
module.exports = websocketService;

websocketService.$inject = ['SockJS', 'Stomp', '$cookies', '$rootScope'];

function websocketService(SockJS, Stomp, $cookies, $rootScope) {
  let stompClient = {};

  return {
    sendMessage: _sendMessage,
    connectUser: _connectUser
  }

  function _getUserInfo() {
    return angular.fromJson($cookies.get('userCredentials'));
  }

  function _connectUser() {
    let userInfo = _getUserInfo();
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

  function _messageSubscriber() {
    stompClient.subscribe('/user/queue/messages', function (output) {
      let incomingMessage = angular.fromJson(output.body);
      // _verifyActiveChats(incomingMessage.fromUser.id);
      $rootScope.$broadcast('newMessage', incomingMessage);
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
}
