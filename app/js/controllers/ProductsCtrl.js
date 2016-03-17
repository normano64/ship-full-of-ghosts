'use strict';

angular
  .module('shipFullOfGhosts.controllers')
    .controller('ProductsCtrl', [
      '$scope',
      '$http',
      'AccountSvc',
      '$window',
      '$timeout',
      'CartSvc',
      '$uibModal',
      'TranslateSvc',
      function($scope, $http, AccountSvc, $window, $timeout, CartSvc, $uibModal, TranslateSvc) {
        $scope.user = AccountSvc.getUser();

        $scope.translation = TranslateSvc.translation;

        $scope.canDrop = false;
        $scope.dragging = false;

        $scope.items = null;
        $http.get('js/drinks.json')
          .then(function(res){
              $scope.items = res.data.payload;
          });

          $scope.predicate = 'namn';
          $scope.order = function(predicate, reverse) {
              $scope.predicate = (reverse ? '-' : '') + predicate;
              $scope.reverse = reverse;
          };

          $scope.allergies = {
              'gluten': false,
              'alcohol': false
          };
          $scope.allergyfn = function(allergy) {
              $scope.allergies[allergy] = !$scope.allergies[allergy];
          };
          $scope.allergyreset = function() {
              $scope.allergies = {
                  'gluten': false,
                  'alcohol': false
              };
          };

        $scope.filterAlcohol = function(item) {
            var keep = true;
            angular.forEach($scope.allergies, function(value, key) {
                if(value && item.allergy.indexOf(key) > -1) {
                    keep = false;
                }
            });
            return keep;
        };

        $scope.showDrinksInfo = function(id) {
          var drinksInfoModal = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'drinksInfo.html',
            controller: 'DrinksInfoCtrl',
            resolve: {
              drinkId: function () {
                return id;
              }
            }
          });
        };

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
            var selectedId = ev.originalEvent.dataTransfer.getData('id');
            CartSvc.addItem(selectedId);
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
        }, 100);
      }]);
