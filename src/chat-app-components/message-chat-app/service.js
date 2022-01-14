module.exports = service;

service.$inject = ['$http'];

function service($http) {
  let path = `${process.env.BASE_URL}/message`;

  return {
    loadAllMessages: _loadAllMessages
  }

  function _loadAllMessages(recipient, loggedUser) {
    return $http({
      url: `${path}/load-all-messages/${loggedUser}/${recipient}`,
      method: 'GET'
    });
  }
}
