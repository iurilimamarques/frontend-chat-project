const angular = require("angular");

module.exports = websocketService;

websocketService.$inject = ['SockJS', 'Stomp', '$cookies', '$rootScope'];

function websocketService(SockJS, Stomp, $cookies, $rootScope) {
  let stompClient = {};

  return {
    sendMessage: _sendMessage,
    connectUser: _connectUser,
    disconnect: _disconnect,
    isConnected: _isConnected
  }

  function _getUserInfo() {
    return angular.fromJson($cookies.get('userCredentials'));
  }

  function _connectUser() {
    let userInfo = _getUserInfo();
    let server = process.env.WEBSOCKET_SERVER || `http://localhost:8082/chat`;
    let ws = SockJS(server);

    stompClient = Stomp.over(ws);

    stompClient.connect({email: userInfo.email}, function () {
      _messageSubscriber();
      _updateChecker();
    }, function (err) {
      console.log(err);
    });
  }

  function _disconnect() {
    stompClient.disconnect();
  }

  function _messageSubscriber() {
    stompClient.subscribe('/user/queue/messages', function (output) {
      let incomingMessage = angular.fromJson(output.body);
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

  function _isConnected() {
    return !angular.equals({}, stompClient);
  }
}
