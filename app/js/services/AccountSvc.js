'use strict';

angular
.module('shipFullOfGhosts.services')
.service('AccountSvc', ['API', '$location', '$http', function(API, $location, $http) {
  var AccountSvc = {};

  AccountSvc.user = {
    users: {

    },
    isSignedIn: false
  };

  $http.get('js/users.json')
  .then(function(res){
    AccountSvc.user.users = res.data.payload;
  });


  AccountSvc.getUser = function() {
    return AccountSvc.user;
  };

  AccountSvc.signIn = function(uname, password) {
    for(var i=0; i<AccountSvc.user.users.length;i++){
      if (uname==password && uname==AccountSvc.user.users[i].username){
        AccountSvc.user.username = AccountSvc.user.users[i].first_name + " " + AccountSvc.user.users[i].last_name;
        AccountSvc.user.isSignedIn = true;
        if(AccountSvc.user.users[i].admin=="yes"){
          $location.path('/admin');
        }
        else if(AccountSvc.user.users[i].admin=="no"){
          $location.path('/products');
        }
      }
    }
  };

    AccountSvc.signOut = function() {
      AccountSvc.user.username = undefined;
      AccountSvc.user.isSignedIn = false;
    }

    return AccountSvc;
  }]);
