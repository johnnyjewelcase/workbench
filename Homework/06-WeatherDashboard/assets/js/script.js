// TO DO
// move li append to cityLookup, use $("#city").html(response.name) instead of the user entry, make sure it only appends if the city's not there
// get the enter key to work on the search
$(document).ready(function () {
  $("#divResults").hide();
  var apiKey = "5e0cb360a3e279b747dc9a93720d69ed";

  function cityLookup(searchTerm) {
    var locQueryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchTerm +
      "&APPID=" +
      apiKey;

    $.ajax({
      url: locQueryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $("#city").html(response.name);

      var queryURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        response.coord.lat +
        "&lon=" +
        response.coord.lon +
        "&appid=" +
        apiKey +
        "&units=imperial";

      getWeather(queryURL);
    });
  }

  function getWeather(weatherUrl) {
    $.ajax({
      url: weatherUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $("#date").html(dateUnixToText(response.current.dt));
      $("#icon").attr(
        "src",
        "https://openweathermap.org/img/w/" +
          response.current.weather[0].icon +
          ".png"
      );
      $("#icon").attr(
        "alt",
        "https://openweathermap.org/img/w/" +
          response.current.weather[0].main +
          ".png"
      );
      $("#temp").html(Math.round(response.current.temp));
      $("#humid").html(response.current.humidity);
      $("#wind").html(response.current.wind_speed);
      $("#btnUV").html(response.current.uvi);
      if (response.current.uvi < 3) {
        $("#btnUV").addClass("btn-success");
      } else if (response.current.uvi < 6 && response.current.uvi >= 3) {
        $("#btnUV").addClass("btn-warning");
      } else if (response.current.uvi < 8 && response.current.uvi >= 6) {
        $("#btnUV").css("background-color", "orange");
      } else if (response.current.uvi < 11 && response.current.uvi >= 8) {
        $("#btnUV").addClass("btn-danger");
      } else if (response.current.uvi >= 11) {
        $("#btnUV").css("background-color", "violet");
      }

      $("#crdGroup").empty();
      for (i = 1; i < 6; i++) {
        var card = $("<div>").addClass("card text-white bg-info mx-1");
        var crdBody = $("<div>").addClass("card-body");
        var crdDate = $("<h5>")
          .addClass("card-title")
          .html(dateUnixToText(response.daily[i].dt));
        var crdIcon = $("<img>")
          .attr(
            "src",
            "https://openweathermap.org/img/w/" +
              response.daily[i].weather[0].icon +
              ".png"
          )
          .attr("alt", response.daily[i].weather[0].description);
        var crdTemp = $("<p>")
          .addClass("card-text")
          .html("Temp:&nbsp;" + Math.round(response.daily[i].temp.day) + "°F");
        var crdHumid = $("<p>")
          .addClass("card-text")
          .html("Humidity:&nbsp;" + response.daily[i].humidity + "%");

        crdBody.append(crdDate);
        crdBody.append(crdIcon);
        crdBody.append(crdTemp);
        crdBody.append(crdHumid);
        card.append(crdBody);
        $("#crdGroup").append(card);
      }
      $("#divResults").css("display", "inline-block");
    });
  }

  // function tempKToF(tempK) {
  //   var tempF = Math.round(((parseInt(tempK) - 273.15) * 9) / 5 + 32);
  //   return tempF;
  // }

  function dateUnixToText(dateUnix) {
    var dateJs = new Date(parseInt(dateUnix) * 1000);
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dateStr =
      days[dateJs.getDay()] +
      " " +
      dateJs.getMonth() +
      "/" +
      dateJs.getDate() +
      "/" +
      dateJs.getFullYear();
    // .toString().substring(2, 4);
    return dateStr;
  }

  $("#btnSearch").click(function () {
    var city = $("#inputCity").val();
    $("#divResults").hide();
    cityLookup(city);
    var newCity = $("<li>")
      .addClass("list-group-item btnCity")
      .attr("city", city)
      .html(city);
    $("#listCities").prepend(newCity);
  });

  $("#listCities").click(function (event) {
    var city = $(event.target).attr("city");
    $("#divResults").hide();
    cityLookup(city);
  });
});
