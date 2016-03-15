// this script is used for fetching all the beers with their information
var http = function() {
  this.get = function(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() { 
      if (request.readyState == 4 && request.status == 200)
        callback(request.responseText);
      }

      request.open("GET", url, true);
      request.send(null);
  };
}

var client = new http();
client.get('http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get', function(response) {
  var payload = JSON.parse(response).payload;
  let requests = payload.map((item) => {
    return new Promise((resolve) => {
      client.get('http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=beer_data_get&beer_id=' + item.beer_id, function(detailResponse) {
        var detailPayload = JSON.parse(detailResponse).payload;
        item.detail = detailPayload[0];
        resolve();
      });
    });
  });

  Promise.all(requests).then(() => console.log(JSON.stringify(payload)));
});