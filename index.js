$(document).on("ready", function() {

  var temp = "C",
    temperatureValue;
  var makeCallAgain = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        finishedLoading(position.coords.latitude, position.coords.longitude);
      });
    } else {
      alert("Please allow the page to access your location and reload the page");
    }
  }
  makeCallAgain();

  function finishedLoading(latitude, longitude) {

    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=8d3ff804b1f7a8a729e5ba510090851a&units=metric",
      dataType: "jsonp",
      success: function(value) {
        $(".temperature").html(Math.floor(value.main.temp) + "&deg;" + "C");
        $(".details").html(value.weather[0].description.replace(value.weather[0].description.charAt(0), value.weather[0].description.charAt(0).toUpperCase()));
        $(".humidity").html(value.main.humidity + "% humidity");
        $(".icon").html("<img src = 'http://openweathermap.org/img/w/" + value.weather[0].icon + ".png'>")

        switch (value.weather[0].main) {

          case "Clear":
            if (value.weather[0].icon == "01d")
              $("body").css("background-image", "url(http://s20.postimg.org/4r95336zx/clear_Sky.jpg)");
            else
              $("body").css("background-image", "url(http://s20.postimg.org/6jy9m6o19/night_Clear_Sky.jpg)");
            break;

          case "Snow":
            if (value.weather[0].icon == "13d")
              $("body").css("background-image", "url(http://s20.postimg.org/96myulu0d/snow.jpg)");
            else
              $("body").css("background-image", "url(http://s20.postimg.org/i6nfkfhnx/snow_Night.jpg)");
            break;

          case "Clouds":
            if (value.weather[0].icon == "02d" || value.weather[0].icon == "03d" || value.weather[0].icon == "04d")
              $("body").css("background-image", "url(http://s20.postimg.org/tlsmx5ru5/clouds.jpg)");
            else
              $("body").css("background-image", "url(http://s20.postimg.org/5vz2e3l0t/clouds_Night.jpg)");
            break;

          case "Rain":
          case "Drizzle":
          case "Thunderstorm":
            if (value.weather[0].icon == "09d" || value.weather[0].icon == "10d" || value.weather[0].icon == "11d")
              $("body").css("background-image", "url(http://s20.postimg.org/pdxuoeqel/rain.jpg)");
            else
              $("body").css("background-image", "url(http://s20.postimg.org/pdxuoeqel/rain.jpg)");
            break;

          case "Atmosphere":
          case "Mist":
            $("body").css("background-image", "url(http://s20.postimg.org/jr1hqxnvx/mist.jpg)");
            break;

          case "Additional":
            $("body").css("background-image", "url(http://s20.postimg.org/ursi1l7ot/sun.jpg)");
            break;

          default:
            $("body").css("background-color", "#1D1F20");
        }
      }
    });

    $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true", function(data) {
      $(".city").html(data.results[0].address_components[2].long_name + ", " +
        data.results[0].address_components[3].long_name + ", " +
        data.results[0].address_components[4].long_name + ", " +
        data.results[0].address_components[5].long_name + ", " +
        data.results[0].address_components[6].long_name);
    });

  }
  setInterval(makeCallAgain, 1000 * 600);
});
