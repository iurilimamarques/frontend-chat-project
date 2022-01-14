module.exports = directive;

directive.$inject = ['$timeout', '$window'];

function directive($timeout, $window) {
  return {
    restrict: 'A',
    scope: {
      scrollToBottom: '='
    },
    link: function(scope, element, attr){
      scope.$watchCollection('scrollToBottom', function(newVal) {
        if (newVal) {
          $timeout(function() {
            element[0].scrollTop =  element[0].scrollHeight;
          }, 0);
        }
      });
    }
  }
}
