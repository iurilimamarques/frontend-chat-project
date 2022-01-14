module.exports = states;

states.$inject = ['$stateProvider', '$urlRouterProvider'];

function states($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/chat-app');

  $stateProvider
    .state('chat-app', {
      url: '/chat-app',
      views: {
        content: {
          template: '<message-page/>'
        }
      }
    });
}
