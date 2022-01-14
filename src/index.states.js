module.exports = states;

states.$inject = ['$stateProvider', '$urlRouterProvider'];

function states($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
      url: '/login',
      views: {
        content: {
          template: '<login/>'
        }
      }
    })
    .state('sign-up', {
      url: '/sign-up',
      views: {
        content: {
          template: '<sign-up/>'
        }
      }
    })
    .state('email-validation', {
      url: '/email-validation',
      views: {
        content: {
          template: '<email-validation/>'
        }
      }
    });
}
