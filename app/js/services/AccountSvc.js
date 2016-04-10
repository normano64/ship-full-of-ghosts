'use strict';

angular
.module('shipFullOfGhosts.services')
.service('AccountSvc', ['API', '$location', '$http', function(API, $location, $http) {
  var AccountSvc = {};
/**
* Object which contains all the users and a signed in state which is initally false.
*/

  AccountSvc.user = {
    users: {

    },
    isSignedIn: false
  };
/**
* Populates the list of users from the information of the API.
*/

  $http.get('js/users.json')
  .then(function(res){
    AccountSvc.user.users = res.data.payload;
  });

/**
* Returns the object
*/

  AccountSvc.getUser = function() {
    return AccountSvc.user;
  };

/**
* Signs in the user with the correct username undame and passwords, updating sign in state to true. If the user is an admin, the user will be redirected to the admin page, if not the user will be redirected to the products page.
*/

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
/**
* Signs out the user, removing the username information and updates the sign in state to false.
*/
    AccountSvc.signOut = function() {
      AccountSvc.user.username = undefined;
      AccountSvc.user.isSignedIn = false;
    }

    return AccountSvc;
  }]);
