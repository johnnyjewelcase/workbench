# Calendar

When the user opens the day planner, I use moment.js to find out what the current day is and format it the way I want before putting it at the top of the page. I also note the current hour for later use.

I ought to initialize a few global variables to make life easier, including an array of hours in the work day and an array that will store objects representing calendar events.
If there's anything stored under "calendar" in localstorage, bring that into the events array.

Now, loop through all the hours in the workday array. Create the following elements and fill them up:

1. a row for the hour currently selected by the loop
1. a cell that will display the time represented by this row
   1. Convert the hour variable in the loop to standard 12hr clock formatting
   1. Append AM or PM
   1. Add the formatted time value to the cell
1. a cell to store the event description
   1. Add the appropriate class to set the background color of this cell to red if the hour of the current row matches the current time variable previously obtained from moment.js.
   1. Add the appropriate class to set the background color of this cell to grey if the hour of the current row is prior to the current time variable previously obtained from moment.js.
   1. Add the appropriate class to set the background color of this cell to green if the hour of the current row is later than the current time variable previously obtained from moment.js.
   1. Loop through the events array if it contains any object
   1. Check each object for a time property that matches that of the current row.
   1. If found, display the event description in this cell.
1. a cell to for the save icon
   1. Add the save icon from Font Awesome.
   1. Add some alignment and padding.
   1. Give this cell an attribute for the hour of the current row for use when an event is saved.

Add each cell to the row once prepared, then add row to the table body.

I'll need an event listener for clicks on the event area. In case the user had previously clicked on another event and did not save, remove any textarea inputs on the stage and put the original text back in the previously-clicked event description. Now store the current text and location in case I need to revert, as above.

If the user clicks the description in a grey "past" row, flash an error message in that cell to let them know that they cannot change the past. If it's a current or future row, hide any exisiting description then create a new textarea input in this cell and focus the cursor inside it.

When a user clicks on the save button, I'll grab the text that the user just entered in the description and make a note of which time/row that I'm on. Store these values in an object. If the user clicks a save button on a different row from the event description being edited, return from this click handler, or I'll end up with a mess.

Assuming I'm saving the correct row, remove the textarea input and add the user-supplied text to the event description cell. Loop through the event array, looking for existing events in the current timeblock. If found, delete it from the array. Either way, it's time to push the newly-created object into the event array and put the whole array in localstorage for safekeeping. When the user refreshes, we start all over again, pulling anything found in localstorage into the events array.

Mostly for troubleshooting purposes, I've added a "clear" button to the bottom of the page. Clicking this deletes local storage AND the event descriptions on the screen.
