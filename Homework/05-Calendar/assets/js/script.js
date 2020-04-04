$(document).ready(function () {
  // Use moment.js to find the current day and format it to make it readable.
  $("#currentDay").html(moment().format("dddd, MMMM Do"));
  // Create an array of hours in the workday.
  var hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  // Find out what time it is so that rows can be colored as specified.
  var currentHour = moment().format("k");

  // starting with a dummy array
  // var events = [
  //   {
  //     time: 8,
  //     event: "8am test",
  //   },
  //   {
  //     time: 10,
  //     event: "10am test",
  //   },
  // ];

  // Create an array to store objects representing calendar events.
  var events = [
    {
      time: 50,
      event: "",
    },
  ];

  // Populate the event array from localstorage, if there's anything in localstorage.
  if (localStorage.getItem("calendar") !== null) {
    events = JSON.parse(localStorage.getItem("calendar"));
  }
  console.log(localStorage.getItem("calendar"));
  console.log(events);

  // Loop through all the hours in the workday.
  for (i = 0; i < hours.length; i++) {
    // Create a row for the hour currently selected by the loop.
    var tr = $("<tr class='row'>");
    // Create a cell to display the time that this row represents.
    var tdHour = $("<td class='col-2 hour'>");
    // Create a cell to store the event.
    var tdEvent = $("<td class='col-9 event'>");
    // Create a cell for the save icon.
    var tdSave = $("<td class='col-1 saveBtn'>")
      // Format the cell so that the icon will be centered.
      .css({
        "text-align": "center",
        padding: "25px",
      })
      // Add the save icon from Font Awesome to the cell.
      .html("<h3><i class='fas fa-save'></i></h3>")
      // Set an attribute for the hour of the current row for use when an event is saved.
      .attr("hour", hours[i]);

    // Display the time appropriately.
    if (hours[i] < 12) {
      tdHour.html(hours[i] + " AM");
    } else if (hours[i] > 12) {
      tdHour.html(hours[i] - 12 + " PM");
    } else {
      tdHour.html("12 PM");
    }

    // Format the color of the row according to its time relative to the current time.
    if (hours[i] < currentHour) {
      tdEvent.addClass("past");
    } else if (hours[i] == currentHour) {
      tdEvent.addClass("present");
    } else if (hours[i] > currentHour) {
      tdEvent.addClass("future");
    }

    // Loop through the events array, looking for a saved event with
    // a time property that matches the currently selected by the loop.
    for (j = 0; j < events.length; j++) {
      if (events[j].time === hours[i]) {
        tdEvent.text(events[j].event);
      }
    }
    tr.append(tdHour, tdEvent, tdSave);

    $("tbody").append(tr);
  }

  // Listen for clicks on the event area.
  $(".event").click(function () {
    var txt = $(this).text();
    if ($(this).hasClass("past")) {
      $(this)
        .html("You can't create events in the past!")
        .css("color", "red")
        .addClass("error");

      setTimeout(function () {
        txt = $(".error").html(txt).css("color", "white");
      }, 1000);
    } else {
      $("textarea").remove();
      $(this).text("");
      $(this).append($("<textarea />").val(txt));
      $("textarea").css("width", "100%");
      $("textarea").focus();
    }
  });

  // Listen for clicks on the save button.
  $(".saveBtn").click(function () {
    var eventText = $("textarea").val();
    $(this).prev().html(eventText);
    var eventObj = {
      time: parseInt($(this).attr("hour")),
      event: eventText,
    };
    events.push(eventObj);
    localStorage.setItem("calendar", JSON.stringify(events));
    console.log(events);
    console.log(localStorage.getItem("calendar"));
  });
});

$("#clear").click(function () {
  console.log("emptying localstorage");
  localStorage.clear();
});
