const angular = require('angular');
const moment = require('moment')

module.exports = Controller;

Controller.$inject = ['MessageChatAppService', '$scope', '$cookies', '$window'];

function Controller(MessageChatAppService, $scope, $cookies, $window) {
  let vm = {};

  this.$onInit = function() {
    vm = this;

    vm.isRecipient = _isRecipient;
    vm.onKeyPress = _onKeyPress;
    vm.sendMessageCtrl = _sendMessage;
    vm.calculateSpanHeight = _calculateSpanHeight;
    vm.messagesList = [];
    vm.message = '';
    vm.loggedUser = _getUserInfo().id;

    $scope.$on('newMessage', _onNewMessage);
    $scope.$watch('vm.contact.id', _onRecipientUserChanges, true);

    _loadAllMessages(vm.contact.id);
  };

  function _getCharactersPerLine(screenWidth) {
    if (screenWidth >= 1583 ) {
      return 111;
    } else if (screenWidth < 1583 && screenWidth >= 1298) {
      return 77;
    } else if (screenWidth < 1298) {
      return 85;
    } else if (screenWidth < 1118) {
      return 60;
    } else if (screenWidth < 937) {
      return 48;
    } else if (screenWidth < 860) {
      return 35;
    } else if (screenWidth < 793) {
      return 32;
    } else if (screenWidth < 773) {
      return 26;
    }
  }

  function _calculateSpanHeight(message) {
    let minHeight = 25;
    let charactersPerLine = _getCharactersPerLine($window.innerWidth);

    let heightPixels = Math.ceil(message.message.length / charactersPerLine) * minHeight;
    console.log(heightPixels)
    return { "height": `${heightPixels}px` };
  }

  function _isRecipient(message) {
    return message.userRecipient.id === vm.loggedUser;
  }

  function _onRecipientUserChanges(oldValue, newValue) {
    if(oldValue !== newValue) _loadAllMessages(newValue);
  }

  function _onKeyPress($event) {
    if(vm.message && $event.keyCode == 13) _sendMessage();
  }

  function _onNewMessage(event, data) {
    if(data.contact.id === vm.contact.id) _pushNewMessage(data);
  }

  function _sendMessage() {
    let message = angular.copy(vm.message);
    vm.message = '';
    let payload = {
      userSender:  _getUserInfo(),
      message: message,
      userRecipient: vm.contact.user,
      contact: vm.contact
    };
    vm.sendMessage(payload);

    let payloadToBePushed = angular.copy(payload);
    payloadToBePushed.createdIn = moment().format('HH:mm DD/MM/YYYY');
    _pushNewMessage(payloadToBePushed, true);
  }

  function _pushNewMessage(data, onSend = false) {
    vm.messagesList.push(data);
    if(!onSend) $scope.$apply(vm.messagesList);
  }

  function _getUserInfo() {
    return angular.fromJson($cookies.get('userCredentials'));
  }

  function _loadAllMessages(id) {
    MessageChatAppService.loadAllMessages(id).then(response => {
      vm.messagesList = response;
    });
  }
}
