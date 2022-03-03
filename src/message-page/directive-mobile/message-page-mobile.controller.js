module.exports = Controller;

Controller.$inject = ['$stateParams', '$injector'];

function Controller($stateParams, $injector) {
  let vm = this;

  vm.selectedContact = {};

  let idContact = $stateParams.idContact;
  let ContactService = $injector.get('ContactService');

  _init();

  function _init() {
    ContactService.getContactById(idContact).then(response => {
      vm.selectedContact = response;
    });
  }
}
