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

    var selectElement = function(identifier) {
      return angular.element(document.querySelectorAll(identifier));
    };

    // $timeout adds a new event to the browser event queue 
    // (the rendering engine is already in this queue) so it will complete the execution before the new timeout event.
    $timeout(function() {
      var cartElement = selectElement('.cart');
      var cartPhantomElement = selectElement('.cart-phantom');
      var productsItemElement = selectElement('.products-item');
      var wrapperElement = selectElement('.product-wrapper');
      var cartDropWrapperElement = selectElement('.cart-drop-wrapper');
      var cartDropIconElement = selectElement('.cart-drop-icon');

      var initialOffset = parseInt(cartElement.css('margin-top'));

      productsItemElement.bind('dragstart', function(ev) {
        ev.originalEvent.dataTransfer.setData('id', angular.element(this).attr('id').slice('products-item-'.length));

        var containerWidth = parseInt(wrapperElement.css('width')) + 2 * parseInt(wrapperElement.css('margin-left'));
        var calcLeft = containerWidth / 2 + 'px';

        $scope.dragging = true;
        $scope.$apply();

        productsItemElement.css('opacity', '0');
        angular.element(this).css('opacity', '1');
        cartDropWrapperElement.css('width', '0px');
        cartDropWrapperElement.css('left', calcLeft);
        cartDropWrapperElement.css('display', 'flex');
      });

      productsItemElement.bind('dragend', function() {
        $scope.canDrop = false;
        $scope.dragging = false;
        $scope.$apply();

        productsItemElement.css('opacity', '1');
        cartDropWrapperElement.css('display', 'none');
      });

      cartDropIconElement.bind('drop', function(ev) {
        var selectedId = ev.originalEvent.dataTransfer.getData('id'));
      });

      cartDropIconElement.bind('dragover', function() {
        $scope.canDrop = true;
        $scope.$apply();
        return false;
      });

      cartDropIconElement.bind('dragleave', function() {
        $scope.canDrop = false;
        $scope.$apply();
        return false;
      });

      angular.element($window).bind("scroll", function() {
        cartPhantomElement.css('margin-top', initialOffset + this.pageYOffset + 'px');
      });
    }, 0);
  }]);
