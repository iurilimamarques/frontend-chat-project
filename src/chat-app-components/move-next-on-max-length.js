module.exports = directive;

directive.$inject = ['$timeout'];

function directive($timeout) {
  return {
    restrict: "A",
    link: function(scope, elem, attrs) {
      elem.bind('keyup', function (e) {
        let partsId = attrs.id.match(/input(\d+)/);
        let currentId = parseInt(partsId[1]);
        let l = e.key !== 'Backspace' ? e.key.length : 0;

        $timeout(function () {
          if (l == elem.attr("maxlength")) {
            let nextElement = document.querySelector('#input' + (currentId + 1));
            if (currentId < 6)
              nextElement.focus();
          } else if (e.which === 8) {
            let nextElement = document.querySelector('#input' + (currentId - 1));
            if (currentId > 1)
              nextElement.focus();
          }
        }, 170);
      });
    }
  }
}
