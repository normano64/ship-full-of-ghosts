'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('NavCtrl', ['$scope', 'AccountSvc', 'TranslateSvc', function($scope, AccountSvc, TranslateSvc) {
    $scope.signOut = function() {
      AccountSvc.signOut();
    };

   $scope.translateSwe = function(){
    	TranslateSvc.translateSwe();
    }

    $scope.translateEng = function(){
    	TranslateSvc.translateEng();
    }

    $scope.user = AccountSvc.getUser();
    
  }]).filter('translate', ['TranslateSvc', function(TranslateSvc) {
      return function(id) {
          return TranslateSvc.wordsList.isSwedish ? id.swedishText : id.englishText;
      };
  }]);
