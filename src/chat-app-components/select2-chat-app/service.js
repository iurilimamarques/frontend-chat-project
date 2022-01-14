module.exports = service;

service.$inject = ['$http'];

function service($http) {
  let path = `${process.env.BASE_URL}/user`;

  return {
    searchUser: _searchUser
  }

  function _searchUser(keyWord, loggedUser) {
    return $http({
      url: path,
      method: 'GET',
      params: { keyWord, loggedUser }
    });
  }
}