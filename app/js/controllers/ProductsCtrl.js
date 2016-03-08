'use strict';

angular
  .module('shipFullOfGhosts.controllers')
    .controller('ProductsCtrl', ['$scope', '$http', 'AccountSvc', '$window', '$timeout', function($scope, $http, AccountSvc, $window, $timeout) {
    $scope.user = AccountSvc.getUser();

    $scope.canDrop = false;
    $scope.dragging = false;

    $scope.items = null;
    $http.get('js/drinks.json')
        .then(function(res){
            $scope.items = res.data.payload;
        });

    // $timeout adds a new event to the browser event queue 
    // (the rendering engine is already in this queue) so it will complete the execution before the new timeout event.
    $timeout(function() {
      var cartElement = angular.element(document.querySelectorAll('.cart'));
      var cartPhantomElement = angular.element(document.querySelectorAll('.cart-phantom'));
      var initialOffset = parseInt(cartElement.css('margin-top'));

      angular.element(document.querySelectorAll('.products-item')).bind('dragstart', function() {
        angular.element(document.querySelectorAll('.products-item')).css('opacity', '0');
        angular.element(this).css('opacity', '1');
        angular.element(document.querySelectorAll('.cart-drop-wrapper')).css('width', '0px');
        var wrapperElement = angular.element(document.querySelectorAll('.product-wrapper'));
        var containerWidth = parseInt(wrapperElement.css('width')) + 2 * parseInt(wrapperElement.css('margin-left'));
        var calcLeft = containerWidth / 2 + 'px';

        $scope.dragging = true;
        $scope.$apply();

        angular.element(document.querySelectorAll('.cart-drop-wrapper')).css('left', calcLeft);
        angular.element(document.querySelectorAll('.cart-drop-wrapper')).css('display', 'flex');
      });

      angular.element(document.querySelectorAll('.products-item')).bind('dragend', function() {
        $scope.canDrop = false;
        $scope.dragging = false;
        $scope.$apply();

        angular.element(document.querySelectorAll('.products-item')).css('opacity', '1');
        angular.element(document.querySelectorAll('.cart-drop-wrapper')).css('display', 'none');
      });

      angular.element(document.querySelectorAll('.cart-drop-icon')).bind('drop', function() {
        console.log('drop');
      });

      angular.element(document.querySelectorAll('.cart-drop-icon')).bind('dragover', function() {
        $scope.canDrop = true;
        $scope.$apply();
        return false;
      });

      angular.element(document.querySelectorAll('.cart-drop-icon')).bind('dragleave', function() {
        $scope.canDrop = false;
        $scope.$apply();
        return false;
      });

      angular.element($window).bind("scroll", function() {
        cartPhantomElement.css('margin-top', initialOffset + this.pageYOffset + 'px');
      });
    }, 0);
  }]);
