$(document).ready(function () {
  // Hide the results until there's something to show.
  $("#divResults").hide();
  // Stash my API key for use in multiple calls
  var apiKey = "5e0cb360a3e279b747dc9a93720d69ed";

  // Create a global array to store all the cities that the user has searched for.
  var cities;
  // Keep track of the last city selected or searched.
  var currentCity;

  // Populate the cities array from localstorage, if there's anything in localstorage.
  if (localStorage.getItem("cities") !== null) {
    cities = JSON.parse(localStorage.getItem("cities"));
    currentCity = localStorage.getItem("lastCity");
    cityLookup(currentCity);
  }

  // Create a function to build the list of previously-searched cities
  function populateCities() {
    // start from scratch whenever this is called to avoid duplication
    $("#listCities").empty();
    // Only proceed if the cities array has something in it.
    if (cities !== undefined) {
      // Create a button to empty out our localstorage.
      var btnClear = $("<button>")
        .addClass("list-group-item list-group-item-danger")
        .attr("id", "btnClear")
        .html("Clear Selected Cities");
      $("#listCities").append(btnClear);

      // Prepend a button for each city in the array.
      for (i = 0; i < cities.length; i++) {
        var newCity = $("<button>")
          .addClass("list-group-item btnCity")
          .attr("city", cities[i])
          .html(cities[i]);
        $("#listCities").prepend(newCity);
      }
    }

    // Once we've created some buttons, make some listeners for them.
    // Create an event listener for the button that clears localstorage.
    $("#btnClear").click(function () {
      localStorage.clear();
      location.reload();
    });

    // Create an event listener for every previously-searched city.
    $(".btnCity").click(function (event) {
      var city = $(event.target).attr("city");
      cityLookup(city);
    });
  }

  // Create a function to process a searched or selected city.
  function cityLookup(searchTerm) {
    // Put the results away while we work on them.
    $("#divResults").hide();
    // Clear the searched city, if any.
    $("#inputCity").val("");
    // Build the API call to check the user-provided city and get details for the more detailed API Call.
    var locQueryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchTerm +
      "&APPID=" +
      apiKey;

    $.ajax({
      url: locQueryURL,
      method: "GET",
    })
      .then(function (response) {
        // Store the city name that the API returns to correct capitlization, then put that city name in the results.
        var city = response.name;
        $("#city").html(city);
        // Initialize the array with this new city name if the array was empty before.
        // Othwewise push the city name into the array if it's not already there.
        if (cities !== undefined) {
          var alreadyThere = false;
          for (i = 0; i < cities.length; i++) {
            if (city === cities[i]) {
              alreadyThere = true;
            }
          }
          if (alreadyThere === false) {
            cities.push(city);
            localStorage.setItem("cities", JSON.stringify(cities));
          }
        } else {
          cities = [response.name];
        }
        // Save the city name in local storage to default to the next time the user returns to this page.
        localStorage.setItem("lastCity", city);
        //Call the function to rebuild the city list.
        populateCities();

        // Build the queryURL for the more detailed API call using hte latitude and longitude retrieved from the first API call.
        var queryURL =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          response.coord.lat +
          "&lon=" +
          response.coord.lon +
          "&appid=" +
          apiKey +
          "&units=imperial";

        getWeather(queryURL);
      })
      // If the user input doesn't result in a valid API call, briefly flash an error message in the input box.
      .fail(function () {
        $("#inputCity").val("Invalid city!").css("color", "red");

        setTimeout(function () {
          $("#inputCity").val("").css("color", "black");
        }, 1000);
      });
  }

  // Create a function to get the weather details via an API call.
  function getWeather(weatherUrl) {
    $.ajax({
      url: weatherUrl,
      method: "GET",
    }).then(function (response) {
      // Make the current date more readable and add it to the page.
      $("#date").html(dateUnixToText(response.current.dt));
      // Change the source URL for the image that represents the current weather and add alt text.
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
      // Fill in remaining details for the current weather section.
      $("#temp").html(Math.round(response.current.temp));
      $("#humid").html(response.current.humidity);
      $("#wind").html(response.current.wind_speed);
      $("#btnUV").html(response.current.uvi);
      // Color-code the UV badge based on the official ranges.
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

      // Clear any previously-generated forecast cards and start over.
      $("#crdGroup").empty();
      // We're grabbing the next five days from the forecast array, skipping 0 because we've already done current weather.
      for (i = 1; i < 6; i++) {
        // Create the card elements one at a time, populating values from the array as we go.
        var crdCol = $("<div>").addClass("col-sm-12");
        var card = $("<div>").addClass("card text-white bg-info mx-1 mb-2");
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

        // Assemble a card and append it to the designated row.
        crdBody.append(crdDate);
        crdBody.append(crdIcon);
        crdBody.append(crdTemp);
        crdBody.append(crdHumid);
        crdCol.append(crdBody);
        card.append(crdCol);
        $("#crdGroup").append(card);
      }
      $("#divResults").css("display", "inline-block");
    });
  }

  // Create a function for cleaning up the Unix dates returned by the API.
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
    return dateStr;
  }

  // Handle the search icon by passing the user-inputted value to the lookup function.
  $("#btnSearch").click(function () {
    console.log("search");
    var city = $("#inputCity").val();
    cityLookup(city);
  });

  // Make the enter key act the same as the search button.
  $("#inputCity").keyup(function (event) {
    if (event.keyCode === 13) {
      var city = $("#inputCity").val();
      cityLookup(city);
    }
  });
});
