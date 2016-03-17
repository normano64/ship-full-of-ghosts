'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('NavCtrl', ['$scope', 'AccountSvc', 'TranslateSvc', function($scope, AccountSvc, TranslateSvc) {
    $scope.signOut = function() {
      AccountSvc.signOut();
    };

    $scope.translateSwe = function(){
          TranslateSvc.translate('swedish');
    }

    $scope.translateEng = function(){
          TranslateSvc.translate('english');
    }

    $scope.user = AccountSvc.getUser();
    
  }]).filter('translate', ['TranslateSvc', function(TranslateSvc) {
      return function(text_id) {
          return text_id[TranslateSvc.translation.language];
      };
  }]);
