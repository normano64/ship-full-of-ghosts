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
      'TranslateSvc',
      function($scope, $http, AccountSvc, $window, $timeout, CartSvc, TranslateSvc) {
        $scope.user = AccountSvc.getUser();

        $scope.wordsList = TranslateSvc.wordsList;

        $scope.canDrop = false;
        $scope.dragging = false;

        $scope.items = null;
        $http.get('js/drinks.json')
          .then(function(res){
              $scope.items = res.data.payload;
          });
          $scope.predicate = 'namn';
          $scope.predicateName = 'Name a-ö';
          $scope.order = function(item, predicate, reverse) {
              if(reverse) {
                  predicate = '-' + predicate;
              }
              $scope.predicate = predicate;
              $scope.reverse = reverse;
              $scope.predicateName = item.currentTarget.textContent;
          };
          $scope.allergy = 'No';
          $scope.allergies = {
              'gluten': false,
              'alcohol': false
          };
          $scope.allergyfn = function(allergy) {
              if($scope.allergies[allergy] == false) {
                  $scope.allergies[allergy] = true;
              } else {
                  $scope.allergies[allergy] = false;
              }
              var allergies = ''
              angular.forEach($scope.allergies, function(value, key) {
                  if(value) {
                      if(allergies == '') {
                          allergies = key;
                      } else {
                          allergies = allergies + ', ' + key;
                      }
                  }
              });
              if(allergies == '') {
                  allergies = 'No';
              }
              $scope.allergy = allergies;
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
