$(document).ready(function () {
  // Use moment.js to find the current day and format it to make it readable.
  $("#currentDay").html(moment().format("dddd, MMMM Do"));

  // Find out what time it is so that rows can be colored as specified.
  var currentHour = moment().format("k");

  // Create an array of hours in the workday.
  var hours = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
  ];

  // Create a global array to store objects representing calendar events.
  var events;

  // I need a couple global variables for event handlers to share.
  var txt;
  var cell;

  // Populate the event array from localstorage, if there's anything in localstorage.
  if (localStorage.getItem("calendar") !== null) {
    events = JSON.parse(localStorage.getItem("calendar"));
  }

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
      tdHour.text(hours[i] + " AM");
    } else if (hours[i] > 12) {
      tdHour.text(hours[i] - 12 + " PM");
    } else {
      tdHour.text("12 PM");
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
    if (events != undefined) {
      for (j = 0; j < events.length; j++) {
        if (events[j].time === hours[i]) {
          tdEvent.text(events[j].event);
        }
      }
    }
    tr.append(tdHour, tdEvent, tdSave);

    // Add the row to the table body.
    $("tbody").append(tr);
  }

  // Listen for clicks on the event area.
  $(".event").click(function () {
    // If the user had previously clicked on another event and did not save, put the original text back.
    if (cell != undefined) {
      cell.text(txt);
    }
    // Store the current text and location in case we need to revert (see above).
    txt = $(this).text();
    cell = $(this);

    // Prevent user from attempting to alter the past.
    if ($(this).hasClass("past")) {
      $(this)
        .text("You can't create events in the past!")
        .css("color", "red")
        .addClass("error");

      setTimeout(function () {
        txt = $(".error").text(txt).css("color", "white");
      }, 1000);
    } else {
      // Remove any textareas on the page that have already been created.
      $("textarea").remove();
      // Hide any text in the current event.
      $(this).text("");
      // Create a new textarea input in the current event and focus the cursor inside it.
      $(this).append($("<textarea />").val(txt));
      $("textarea").css("width", "100%");
      $("textarea").focus();
    }
  });

  // Listen for clicks on the save button.
  $(".saveBtn").click(function () {
    // Grab the text that the user just intered and make a note of which time/row that we're on.
    var eventText = $("textarea").val();
    var eventHour = parseInt($(this).attr("hour"));

    // Get rid of the text input and replace it with the user-supplied text.
    $("textarea").remove();
    $(this).prev().text(eventText);

    // Check whether we already have any events saved.
    if (events != undefined) {
      // If so, check for an existing event in this time period.
      for (j = 0; j < events.length; j++) {
        if (events[j].time === eventHour) {
          // If so, delete it from the array.
          events.splice(j, 1);
        }
      }
    }

    // Create an object to hold the newly-created event.
    var eventObj = {
      time: eventHour,
      event: eventText,
    };

    // If we already have any events in the array, push the new one into the array.
    // If not, initialize the array with this new object.
    if (events != undefined) {
      events.push(eventObj);
    } else {
      events = [
        {
          time: eventHour,
          event: eventText,
        },
      ];
    }

    // Store the events array in localstorage for safekeeping.
    localStorage.setItem("calendar", JSON.stringify(events));

    // Store the event description in a global variable to make sure that it overwrites any previous event at this time.
    txt = eventText;
  });
});

// Make the clear button delete local storage AND the events on the screen.
$("#clearBtn").click(function () {
  localStorage.clear();
  $(".event").empty();
});
