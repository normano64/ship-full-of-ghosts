'use strict';

angular
  .module('shipFullOfGhosts.services')
  .service('TranslateSvc', ['API', '$http', function(API, $http) {
    var TranslateSvc = {};

      TranslateSvc.translation = {
        words:{
            'BEER': {
                'english': 'Beer',
                'swedish': 'Öl'},
            'WINE': {
                'english': 'Wine',
                'swedish': 'Vin'},
            'WHISKEY': {
                'english': 'Whiskey',
                'swedish': 'Whisky'},
            'GUEST': {
                'english': 'Guest',
                'swedish': 'Gäst'},
            'BEVERAGE': {
                'english': 'Beverages',
                'swedish': 'Drycker'},
            'USERNAME': {
                'english': 'Username',
                'swedish': 'Användarnamn'},
            'PASSWORD': {
                'english': 'Password',
                'swedish': 'Lösenord'},
            'LOGIN': {
                'english': 'Login',
                'swedish': 'Logga in'},
            'INVALID_USERNAME_OR_PASSWORD': {
                'english': 'Invalid username or password',
                'swedish': 'Ogiltigt använarnamn eller lösenord'},
            'LOW_STOCK': {
                'english': 'Low stock of the following products(s)',
                'swedish': 'Få varor i lagret av följande produkt(er)'},
            'STOCK_ADJUSTMENTS': {
                'english': 'Stock adjustments',
                'swedish': 'Justering av lager'},
            'SELECT_BEVERAGE': {
                'english': 'Select the beverage you want to adjust',
                'swedish': 'Välj drycken du vill justera'},
            'LEFT': {
                'english': 'Left',
                'swedish': 'Kvar'},
            'ALLERGY': {
                'english': 'Allergy',
                'swedish': 'Allergi'},
            'SORT_BY': {
                'english': 'Sort by',
                'swedish': 'Sortera efter'},
            'NAME_AO': {
                'english': 'Name a-ö',
                'swedish': 'Namn a-ö'},
            'NAME_OA': {
                'english': 'Name ö-a',
                'swedish': 'Namn ö-a'},
            'PRICE_LOW_HIGH': {
                'english': 'Price low-high',
                'swedish': 'Pris lågt-högt'},
            'PRICE_HIGH_LOW': {
                'english': 'Price high-low',
                'swedish': 'Pris högt-lågt'},
            'SEARCH': {
                'english': 'Search...',
                'swedish': 'Sök...'},
            'REDO': {
                'english': 'Redo',
                'swedish': 'Gör om'},
            'UNDO': {
                'english': 'Undo',
                'swedish': 'Ångra'},
            'CHECKOUT': {
                'english': 'Checkout',
                'swedish': 'Betala'},
            'ALCOHOL': {
                'english': 'Alcohol',
                'swedish': 'Alkohol'},
            'GLUTEN': {
                'english': 'Gluten',
                'swedish': 'Gluten'},
            'NONE': {
                'english': 'None',
                'swedish': 'Ingen'},
            'AMOUNT': {
                'english': 'Amount',
                'swedish': 'Kostnad'},
            'NONE': {
                'english': 'None',
                'swedish': 'Ingen'},
            'RELEASED': {
                'english': 'Released',
                'swedish': 'Säljstart'},
            'PRODUCT_GROUP': {
                'english': 'Product group',
                'swedish': 'Varugrupp'},
            'PACKAGING': {
                'english': 'Packaging',
                'swedish': 'Förpackning'},
            'ORIGIN': {
                'english': 'Origin',
                'swedish': 'Ursprung'},
            'ORIGIN_NAME': {
                'english': 'Origin name',
                'swedish': 'Ursprungsnamn'},
            'PRODUCER': {
                'english': 'Producer',
                'swedish': 'Producent'},
            'SUPPLIER': {
                'english': 'Supplier',
                'swedish': 'Leverantör'},
            'ALCOHOL_STRENGTH': {
                'english': 'Alcohol strength',
                'swedish': 'Alkoholhalt'},
            'SELECTION': {
                'english': 'Selection',
                'swedish': 'Sortiment'},
            'ORGANIC': {
                'english': 'Organic',
                'swedish': 'Ekologisk'},
            'KOSHER': {
                'english': 'Kosher',
                'swedish': 'Koscher'},
            'CLOSE': {
                'english': 'Close',
                'swedish': 'Stäng'},
            'BUY': {
                'english': 'Buy',
                'swedish': 'Köp'},
            'NAME': {
                'english': 'Name',
                'swedish': 'Namn'},
            'PRICE': {
                'english': 'Price',
                'swedish': 'Pris'},
            'QUANTITY': {
                'english': 'Quantity',
                'swedish': 'Kvantitet'},
            'TOTAL_PRICE': {
                'english': 'Total price',
                'swedish': 'Totalbelopp'},
            'TOTAL': {
                'english': 'Total',
                'swedish': 'Total'},
            'CONFIRM': {
                'english': 'Confirm',
                'swedish': 'Bekräfta'},
            'THANK_YOU': {
                'english': 'Thank you',
                'swedish': 'Tack'},
            'YOU_WILL_BE_REDIRECTED': {
                'english': 'You will be redirect to home page in',
                'swedish': 'Du kommer att skickas till startsidan om'},
            'SECONDS': {
                'english': 'seconds',
                'swedish': 'sekunder'}
        },
          language: 'english',
          languages: ['english', 'swedish']
      };

      TranslateSvc.getWords = function() {
          return TranslateSvc.translation;
      };

      TranslateSvc.translate = function(language){
          if(TranslateSvc.translation.languages.indexOf(language) > -1) {
              TranslateSvc.translation.language = language;
          }
      };

    return TranslateSvc;
  }]);
