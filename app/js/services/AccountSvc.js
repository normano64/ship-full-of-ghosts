'use strict';

angular
  .module('shipFullOfGhosts.services')
  .service('AccountSvc', ['API', '$location', function(API, $location) {
    var AccountSvc = {};

    AccountSvc.user = {
      isSignedIn: false
    }

    AccountSvc.getUser = function() {
      return AccountSvc.user;
    };

    AccountSvc.signIn = function(username, password) {
      AccountSvc.user.username = username;
      AccountSvc.user.isSignedIn = true;

      $location.path('/products');
    };

    AccountSvc.signOut = function() {
      AccountSvc.user.username = undefined;
      AccountSvc.user.isSignedIn = false;
    }

    return AccountSvc;
  }]);
