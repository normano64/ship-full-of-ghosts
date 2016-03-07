'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('ProductsCtrl', ['$scope', 'AccountSvc', '$window', '$timeout', function($scope, AccountSvc, $window, $timeout) {
    $scope.user = AccountSvc.getUser();

    $scope.items = [
      {
        id: 0,
        name: 'Brooklyn',
        price: 79
      },
      {
        id: 1,
        name: 'Chimay blå',
        price: 27.9
      },
      {
        id: 2,
        name: 'Thai',
        price: 57
      },
      {
        id: 3,
        name: 'Kyckling Med',
        price: 420
      },
      {
        id: 4,
        name: 'Thai Broileri',
        price: 10
      },
      {
        id: 5,
        name: 'Ayam',
        price: 100
      }
    ];

    // $timeout adds a new event to the browser event queue 
    // (the rendering engine is already in this queue) so it will complete the execution before the new timeout event.
    $timeout(function() {
      var cartElement = angular.element(document.querySelectorAll('.cart'));
      var initialOffset = parseInt(cartElement.css('margin-top'));

      angular.element(document.querySelectorAll('.products-item')).bind('dragstart', function() {
        console.log('start');
        angular.element(document.querySelectorAll('.products-item')).css('opacity', '0');
        angular.element(this).css('opacity', '1');
        angular.element(document.querySelectorAll('.cart-drop')).css('width', angular.element(document.querySelectorAll('.product-wrapper')).css('width'));
        angular.element(document.querySelectorAll('.cart-drop')).css('display', 'flex');
      });

      angular.element(document.querySelectorAll('.products-item')).bind('dragend', function() {
        console.log('end');
        angular.element(document.querySelectorAll('.products-item')).css('opacity', '1');
        angular.element(document.querySelectorAll('.cart-drop')).css('display', 'none');
      });

      angular.element($window).bind("scroll", function() {
        cartElement.css('margin-top', initialOffset + this.pageYOffset + 'px');
      });
    }, 0);
  }]);
