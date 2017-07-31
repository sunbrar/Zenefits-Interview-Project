/*
Sundeep Brar
Zenefits Interview Project
*/

var globalCity = "sf,ca";
var globalMessage;


//Initialization of map
var map = new google.maps.Map(document.getElementById('map-layout'), {
  center:{
    lat: 37.785341,
    lng: -122.395377
  },
  zoom:15
});

//Initialization of marker
var marker = new google.maps.Marker({
  position:{
    lat: 37.785341,
    lng: -122.395377
  },
  map:map
});

//Default Weather Location
getWeather("SF, CA");

//Google search box maps API initlization
var searchBox = new google.maps.places.SearchBox(document.getElementById('location-input'));

//event handler for search queries
google.maps.event.addListener(searchBox, 'places_changed', function(){ //places_changed is for changing loation
  var places = searchBox.getPlaces();

  var bounds = new google.maps.LatLngBounds();

  var i, place;

  for(i = 0; place = places[i]; i++){
    bounds.extend(place.geometry.location);
    marker.setPosition(place.geometry.location);
  }

  map.fitBounds(bounds);
  map.setZoom(15);

  var address = places[0].formatted_address;

  //Adjusting weather to current location queried
  getWeather(address);


  //Insertion of locatiion photos
  try {
      places[0].photos[0];

      $('#localAddress').empty();
      $("#car1").empty();$("#car2").empty();$("#car3").empty();$("#car4").empty();$("#car5").empty();
      $("#car6").empty();$("#car7").empty();$("#car8").empty();$("#car9").empty();$("#car0").empty();

      $('#myCarousel').append('<a id = "circle1" class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a id = "circle2" class="right carousel-control" href="#myCarousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a>');

      $("#car1").prepend('<img src="'+places[0].photos[0].getUrl({maxWidth:1000})+'" alt="Los Angeles" style="width:100%; height: 300px;">');
      $("#car2").prepend('<img src="'+places[0].photos[1].getUrl({maxWidth:1000})+'" alt="Los Angeles" style="width:100%; height: 300px;">');
      $("#car3").prepend('<img src="'+places[0].photos[2].getUrl({maxWidth:1000})+'" alt="Los Angeles" style="width:100%; height: 300px;">');
      $("#car4").prepend('<img src="'+places[0].photos[3].getUrl({maxWidth:1000})+'" alt="Los Angeles" style="width:100%; height: 300px;">');
      $("#car5").prepend('<img src="'+places[0].photos[4].getUrl({maxWidth:1000})+'" alt="Los Angeles" style="width:100%; height: 300px;">');
      $("#car6").prepend('<img src="'+places[0].photos[5].getUrl({maxWidth:1000})+'" alt="Los Angeles" style="width:100%; height: 300px;">');
      $("#car7").prepend('<img src="'+places[0].photos[6].getUrl({maxWidth:1000})+'" alt="Los Angeles" style="width:100%; height: 300px;">');
      $("#car8").prepend('<img src="'+places[0].photos[7].getUrl({maxWidth:1000})+'" alt="Los Angeles" style="width:100%; height: 300px;">');
      $("#car9").prepend('<img src="'+places[0].photos[8].getUrl({maxWidth:1000})+'" alt="Los Angeles" style="width:100%; height: 300px;">');
      $("#car0").prepend('<img src="'+places[0].photos[9].getUrl({maxWidth:1000})+'" alt="Los Angeles" style="width:100%; height: 300px;">');
  }
  catch(err) {
  //If locaiton has no photos
    $("#car1").empty();$("#car2").empty();$("#car3").empty();$("#car4").empty();$("#car5").empty();
    $("#car6").empty();$("#car7").empty();$("#car8").empty();$("#car9").empty();$("#car0").empty();
    $("#circle1").empty();$("#circle2").empty();$('#localAddress').empty();

    $('#localAddress').append('<div>No Photos Founds</div>');
  }

});


//Weather function calls Yahoo Weather API and appends weather information to DOM
function getWeather(x) {

    $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast ' +
      'where woeid in (select woeid from geo.places(1) where text="'+x+'")&format=json', function (data) {

        var fullName = data.query.results.channel.location.city +','+ data.query.results.channel.location.region;

        var cityName = data.query.results.channel.location.city + ":";

        var weatherReturn = data.query.results.channel.item.condition.temp + data.query.results.channel.units.temperature;

        globalCity = fullName;

        var weatherIcon = data.query.results.channel.item.condition.code;

        var weatherText = data.query.results.channel.item.condition.text;

        $("#weatherText").empty();
        $("#weatherText").append(weatherText);

        $("#cityName").empty();
        $("#cityName").append(cityName);

        $("#weatherIcon").empty();
        $('#weatherIcon').prepend('<img id="'+weatherIcon+'" src="images/weatherIcons/'+weatherIcon+'.png" />')

        $("#weather").empty();
        $("#weather").append(weatherReturn);

        if(x == "SF, CA"){

        }else{

          var contentString = '<div>Sunrise: '+data.query.results.channel.astronomy.sunrise+'</div><br><div>Sunset: '+data.query.results.channel.astronomy.sunset+'</div><br><div>Humidity: '+data.query.results.channel.atmosphere.humidity+'</div><br><div> Pressure: '+data.query.results.channel.atmosphere.pressure+'</div>';

          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });

          marker.addListener('click', function() {
            if(infowindow){
              infowindow.close();
            }
            infowindow.open(map, marker);
          });
        }



    });
}
