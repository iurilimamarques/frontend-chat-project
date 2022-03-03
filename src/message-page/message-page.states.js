const angular = require("angular");
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
      },
      resolve: {
        configRestangular: (RestangularConfig) => {
          RestangularConfig.init();
        }
      }
    })
    .state('contact', {
      url: '/contact/:idContact',
      views: {
        content: {
          template: '<message-page-mobile/>'
        }
      }
    });
}
