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

          /* Loads all drinks from json file and store in $scope
             variable. */
        $scope.items = null;
        $http.get('js/drinks.json')
          .then(function(res){
              $scope.items = res.data.payload;
          });
          /* The default predicate is by name, order function changes
             predicate and ascending or descending. */
          $scope.predicate = 'namn';
          $scope.order = function(predicate, reverse) {
              $scope.predicate = (reverse ? '-' : '') + predicate;
              $scope.reverse = reverse;
          };

          /* By default allergies are set to false. */
          $scope.allergies = {
              'gluten': false,
              'alcohol': false
          };
          /* Inverts the value of the given allergy. */
          $scope.allergyfn = function(allergy) {
              $scope.allergies[allergy] = !$scope.allergies[allergy];
          };
          /* Sets all allergies to false*/
          $scope.allergyreset = function() {
              $scope.allergies = {
                  'gluten': false,
                  'alcohol': false
              };
          };

          /* Returns true if product doesn't clash with the current
          allergy settings, else false. Used as a filter function on a
          list in a view to filter out none matching products */
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

          var cartElement = selectElement('.cart');
          var cartPhantomElement = selectElement('.cart-phantom');
          var wrapperElement = selectElement('.product-wrapper');
          var cartDropWrapperElement = selectElement('.cart-drop-wrapper');
          var cartDropIconElement = selectElement('.cart-drop-icon');

          var initialOffset = parseInt(cartElement.css('margin-top'));
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
          $scope.$watch(function() {
              return selectElement('.products-items')[0].childNodes.length;
          }, function (newValue, oldValue) {
              if (newValue > oldValue) {
                  var productsItemElement = selectElement('.products-item');
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
              }
          });
      }]);
