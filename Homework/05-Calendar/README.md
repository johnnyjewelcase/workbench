# Calendar

When the user opens the day planner, we use moment.js to find out what the current day is and format it the way we want before putting it at the top of the page. We also note the current hour for later use.

Next we initialize a few global variables to make life easier, including an array of hours in the work day.

THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist

Create a global array to store objects representing calendar events.

I need a couple global variables for event handlers to share.

Populate the event array from localstorage, if there's anything in localstorage.

Loop through all the hours in the workday.
Create a row for the hour currently selected by the loop.
Create a cell to display the time that this row represents.
Create a cell to store the event.
Create a cell for the save icon.
Format the cell so that the icon will be centered.
Add the save icon from Font Awesome to the cell.
Set an attribute for the hour of the current row for use when an event is saved.

    Display the time appropriately.

    Format the color of the row according to its time relative to the current time.

    Loop through the events array, looking for a saved event with
    a time property that matches the currently selected by the loop.

    Add the row to the table body.

Listen for clicks on the event area.
If the user had previously clicked on another event and did not save, put the original text back.
Store the current text and location in case we need to revert (see above).

    Prevent user from attempting to alter the past.
      Remove any textareas on the page that have already been created.
      Hide any text in the current event.
      Create a new textarea input in the current event and focus the cursor inside it.

Listen for clicks on the save button.
Grab the text that the user just intered and make a note of which time/row that we're on.

    Get rid of the text input and replace it with the user-supplied text.

    Check whether we already have any events saved.
      If so, check for an existing event in this time period.
          If so, delete it from the array.

    Create an object to hold the newly-created event.

    If we already have any events in the array, push the new one into the array.
    If not, initialize the array with this new object.

    Store the events array in localstorage for safekeeping.
    localStorage.setItem("calendar", JSON.stringify(events));

    Store the event description in a global variable to make sure that it overwrites any previous event at this time.

Make the clear button delete local storage AND the events on the screen.
