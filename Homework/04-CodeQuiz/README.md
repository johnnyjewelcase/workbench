## Code Quiz

###### GIVEN I am taking a code quiz

Unbeknownst to the user, we have placed four main divs within index.html to cover the main functions of the quiz: a **start page**, a **quiz**, a **finish page**, and a **scoreboard**. In script.js, we've already created variables and stored all of the page elements that we'll be manipulating and/or reading. We've created an array of objects, and each object contains:

1. a question
1. four possible answers
1. an identifier for the correct answer

We've also executed the first function to make sure that all of the variables are in the starting position, and the **start page**--which includes instructions and a start button--is the only thing showing below the ever-present nav bar.

###### WHEN I click the start button

###### THEN a timer starts and I am presented with a question

Clicking the start button calls a function that uses setInterval to operate a timer, which is displayed in the nav bar as a progress bar. The "start page" div is hidden, and the **quiz** div is displayed. We have begun iterating through the array of question objects, and the question text is displayed on the screen along with four buttons corresponding to four possible answers.

###### WHEN I answer a question

###### THEN I am presented with another question

Clicking an answer iterates further into the array, replacing the text for the quesiton and possible answers.

###### WHEN I answer a question incorrectly

###### THEN time is subtracted from the clock

Clicking an answer also passes the ID of the clicked response to a function that compares it to the correct response ID as stored in the current question object. If these do not match, 5 seconds are subtracted from the current time.

###### WHEN all questions are answered or the timer reaches 0

###### THEN the game is over

The countdown function is constantly checking to see the remaining time has passed zero, either via setInterval or subtraction due to incorrect answers. When that happens, or when iterating through the question passes the array length, the **quiz** div is hidden, and the **finish** div is displayed.

###### WHEN the game is over

###### THEN I can save my initials and score

The **finish** div reports the remaining time to the user as their score and tells the user how many questions were answered correctly. The user is shownn a form so that they can provide their initials for scorekeeping purposes. Upon submitting their initials, the **finish** div is hidden, and the **scoreboard** div is displayed, with the row containing the user's initials and score highlighted to show how they compared to other scores.

###### ALSO

In the nav bar at the top of the page, the upper left link allows the user to do something different depending on where they are:

1. Go to the scoreboard from the start page.
1. Go to the start page from the scoreboard.
1. Start the quiz over while taking the quiz, i.e. go to the start page and clear all the scorekeeping variables.
1. Retake the quiz rather than submitting their initials, i.e. go to the start page and clear all the scorekeeping variables.

The upper left of the nav bar displays the countdown timer during the quiz, which starts green, turns yellow at 30 seconds, and turns red at 10 seconds.
