'use strict';

angular
  .module('shipFullOfGhosts.services')
  .service('TranslateSvc', ['API', '$http', function(API, $http) {
    var TranslateSvc = {};

    TranslateSvc.wordsList = {
      words:{
     "id_1":{
      "englishText": "Beer",
      "swedishText": "Öl"},
      "id_2":{
      "englishText": "Wine",
      "swedishText": "Vin"},
      "id_3":{
      "englishText": "Whiskey",
      "swedishText": "Whisky"},
      "id_4":{
      "englishText": "Guest",
      "swedishText": "Gäst"},
      "id_5":{    
      "englishText": "Beverages",
      "swedishText": "Drycker"},
      "id_6":{
      "englishText": "Username",
      "swedishText": "Användarnamn"},
      "id_7":{
      "englishText": "Password",
      "swedishText": "Lösenord"},
      "id_8":{
      "englishText": "Login",
      "swedishText": "Logga in"}
      },
      isSwedish:false
    };

    TranslateSvc.getWords = function() {
      return TranslateSvc.wordsList;
    };

    TranslateSvc.translateSwe = function(){
      TranslateSvc.wordsList.isSwedish = true;
    };

    TranslateSvc.translateEng = function(){
      TranslateSvc.wordsList.isSwedish = false;
    }

    return TranslateSvc;
  }]);