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
      "swedishText": "Logga in"},
      "id_9":{
      "englishText": "Invalid username or password",
      "swedishText": "Ogiltigt använarnamn eller lösenord"},
      "id_10":{
      "englishText": "Low stock of the following products(s)",
      "swedishText": "Få varor i lagret av följande produkt(er)"},
      "id_11":{
      "englishText": "Stock adjustments",
      "swedishText": "Justering av lager"},
      "id_12":{
      "englishText": "Select the beverage you want to adjust",
      "swedishText": "Välj drycken du vill justera"},
      "id_13":{
      "englishText": "Left",
      "swedishText": "Kvar"},
      "id_14":{
      "englishText": "Allergy",
      "swedishText": "Allergi"},
      "id_15":{
      "englishText": "Sort by",
      "swedishText": "Sortera efter"},
      "id_16":{
      "englishText": "Name a-ö",
      "swedishText": "Namn a-ö"},
      "id_17":{
      "englishText": "Price low-high",
      "swedishText": "Pris lågt-högt"},
      "id_18":{
      "englishText": "Price high-low",
      "swedishText": "Pris högt-lågt"},
      "id_19":{
      "englishText": "Search term...",
      "swedishText": "Sök..."},
      "id_20":{
      "englishText": "Redo",
      "swedishText": "Gör om"},
      "id_21":{
      "englishText": "Undo",
      "swedishText": "Ångra"},
      "id_22":{
      "englishText": "Checkout",
      "swedishText": "Betala"},
      "id_23":{
      "englishText": "Alcohol",
      "swedishText": "Alkohol"},
      "id_24":{
      "englishText": "No",
      "swedishText": "Nej"},
      "id_25":{
      "englishText": "Name ö-a",
      "swedishText": "Namn ö-a"},
      "id_26":{
      "englishText": "amount",
      "swedishText": "mängd"}
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