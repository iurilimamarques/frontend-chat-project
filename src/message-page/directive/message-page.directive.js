const controller = require('./message-page.controller');

module.exports = directive;

directive.$inject = ['$window', '$templateCache'];

function directive($window, $templateCache) {
  return {
    template: '<div ng-include="templateUrl"></div>',
    controller: controller,
    controllerAs: 'vm',
    link: (scope) => {
      $window.onresize = () => {
        changeTemplate();
        scope.$apply();
      }
      changeTemplate();

      function changeTemplate() {
        let screenWidth = $window.innerWidth;
        if (screenWidth < 768) {
          $templateCache.put('mobile-template', require('./templates/mobile.html'));
          scope.templateUrl = 'mobile-template';
        } else if (screenWidth >= 768) {
          $templateCache.put('default-template', require('./templates/default.html'));
          scope.templateUrl = 'default-template';
        }
      }
    }
  }
}
