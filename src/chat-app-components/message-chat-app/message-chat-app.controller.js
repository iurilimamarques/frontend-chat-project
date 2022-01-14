const angular = require('angular');
const moment = require('moment')

module.exports = Controller;

Controller.$inject = ['MessageChatAppService', '$scope'];

function Controller(MessageChatAppService, $scope) {
  let vm = {};

  this.$onInit = function() {
    vm = this;

    vm.sendMessageCtrl = _sendMessage;
    vm.messagesList = [];
    vm.message = '';
    vm.loggedUser = _getUserInfo().id;
    vm.onKeyPress = _onKeyPress;

    $scope.$on('newMessage', _onNewMessage);
    $scope.$watch('vm.recipient.id', _onRecipientUserChanges);

    _loadAllMessages();
  };

  function _onRecipientUserChanges(newValue, oldValue) {
    if(newValue != oldValue) _loadAllMessages();
  }

  function _onKeyPress($event) {
    if(vm.message && $event.keyCode == 13) _sendMessage();
  }

  function _onNewMessage(event, data) {
    if(data.fromUser.id == vm.recipient.id) _pushNewMessage(data);
  }

  function _sendMessage() {
    let message = angular.copy(vm.message);
    vm.message = '';
    let payload = {
      fromUser:  _getUserInfo(),
      message: message,
      userDestination: vm.recipient,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    vm.sendMessage(payload);

    let payloadToBePushed = angular.copy(payload);
    payloadToBePushed.createdAt = moment(payload.createdAt).format('HH:mm DD/MM/YYYY');
    _pushNewMessage(payloadToBePushed, true);
  }

  function _pushNewMessage(data, onSend = false) {
    vm.messagesList.push(data);
    if(!onSend) $scope.$apply(vm.messagesList);
  }

  function _getUserInfo() {
    return angular.fromJson($cookies.get('userCredentials'));
  }

  function _loadAllMessages() {
    MessageChatAppService.loadAllMessages(vm.recipient.id, _getUserInfo().id).then(response => {
      vm.messagesList = response.data;
    });
  }
}
