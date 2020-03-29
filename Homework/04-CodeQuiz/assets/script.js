// Grab all the page elements that we'll need
var body = document.querySelector('body');
var elStart = document.querySelector('#start');
var elQuiz = document.querySelector('#quiz');
var elFinish = document.querySelector('#finish');
var elScores = document.querySelector('#scores');
var elSwitch = document.querySelector('#switch');
var elTimer = document.querySelector('#timer');
var elProgress = document.querySelector('#progressBar');
var elQuestion = document.querySelector('#question');
var elsResponse = document.querySelectorAll('.response');
var btnStart = document.querySelector('#btnStart');
var elCheck = document.querySelector('#rightwrong');
var elAns1 = document.querySelector('#ans1');
var elAns2 = document.querySelector('#ans2');
var elAns3 = document.querySelector('#ans3');
var elAns4 = document.querySelector('#ans4');
var elFinalScore = document.querySelector('#finalScore');
var elForm = document.querySelector('#intialsForm');
var elInitials = document.querySelector('#intialsInput');
var elSubmit = document.querySelector('#intialsSubmit');
var elScoreBody = document.querySelector('#scoreBody');

// Store text required for each 'page' of the quiz in an object.
var q1 = {
    question: '#1 What is the HTML tag under which one can write the JavaScript code?',
    ans1: '<code>&ltjavascript&gt</code>',
    ans2: '<code>&ltscripted&gt</code>',
    ans3: '<code>&ltscript&gt</code>',
    ans4: '<code>&ltjs&gt</code>',
    correct: 'res3'
};
var q2 = {
    question: '#2 Choose the correct JavaScript syntax to change the content of the following HTML code:<br \> &lt;p id=\'msgBox\'&gt;Message Placeholder&lt;/p&gt;',
    ans1: '<code>document.getElement(msgBox).innerHTML="Hello World!";</code>',
    ans2: '<code>document.getElementById("msgBox").innerHTML="Hello World!";</code>',
    ans3: '<code>document.getId("msgBox")="Hello World!";</code>',
    ans4: '<code>document.getElementById("msgBox").innerHTML=Hello World!;</code>',
    correct: 'res2'
};

var q3 = {
    question: '#3 Which of the following is the correct syntax to display "Hello World!" in an alert box using JavaScript?',
    ans1: '<code>alertbox("Hello World!");</code>',
    ans2: '<code>msg("Hello World!");</code>',
    ans3: '<code>msgbox("Hello World!");</code>',
    ans4: '<code>alert("Hello World!");</code>',
    correct: 'res4'
};

var q4 = {
    question: '#4 What is the correct syntax for referring to an external script called "script.js"',
    ans1: '<code>&lt;script src="script.js"&gt;</code>',
    ans2: '<code>&lt;script href="script.js"&gt;</code>',
    ans3: '<code>&lt;script ref="script.js"&gt;</code>',
    ans4: '<code>&lt;script name="script.js"&gt;</code>',
    correct: 'res1'
};

var q5 = {
    question: '#5 Predict the output of the following JavaScript code:<br \> &lt;script type="text/javascript"&gt;<br />a = 8 + "8";<br />document.write(a); &lt;/script&gt;',
    ans1: '16',
    ans2: 'Complilation Error',
    ans3: '88',
    ans4: 'Run Time Error',
    correct: 'res3'
};

// Store each 'page' object in an array; initialize the page counter.
var quiz = [];
quiz.push(q1, q2, q3, q4, q5);
var q = -1;

// Inititalize quiz duration and time interval in a variable
var timeLeft;
var timeInterval;

// Initialize some variables for scorekeeping purposes.
var initials;
var score;
var rightAnswers;

// Create a function to reset the quiz back to start.
var state = 'start';

function startPage() {
    elStart.style.display = 'block';
    elQuiz.style.display = 'none';
    elTimer.style.display = 'none';
    elFinish.style.display = 'none';
    elScores.style.display = 'none';
    elSwitch.textContent = 'View the Scoreboard';
    q = -1;
    clearInterval(timeInterval);
    timeLeft = 45;
    score = -1;
    initials = '';
    rightAnswers = 0;
    state = 'start';
}
startPage();

// Initialize scoreboard
var scoreboard = [];
localStorage.setItem('scoreboard', JSON.stringify(scoreboard));

// Create a function to operate the timer, to be called at the beginning of the quiz.
function countDown() {
    console.log('counting down');
    elTimer.style.display = 'inline';
    elProgress.style.color = 'black';
    elProgress.classList.remove("bg-warning");
    elProgress.classList.remove("bg-danger");
    elProgress.classList.add("bg-success");

    timeInterval = setInterval(function () {
        timeLeft--;
        elProgress.textContent = timeLeft + ' seconds left';
        elProgress.style.width = ((timeLeft / 45) * 100) + 1 + '%';
        if (timeLeft <= 30 && timeLeft > 10) {
            elProgress.classList.remove("bg-success");
            elProgress.classList.add("bg-warning");
        }

        if (timeLeft <= 10) {
            elProgress.classList.remove("bg-warning");
            elProgress.classList.add("bg-danger");
        }

        if (timeLeft <= 0) {
            completeQuiz();
        }
    }, 1000);
}

// Add listener for user clicking the start button.
btnStart.addEventListener('click', function () {
    console.log('clicking start');
    countDown();
    nextQuestion();
    elStart.style.display = 'none';
    elQuiz.style.display = 'block';
    elFinish.style.display = 'none';
    elScores.style.display = 'none';
    elSwitch.textContent = 'Start Over';
    state = 'quiz';
});

// Define what happens when we run out of questions or time.
function completeQuiz() {
    console.log('ending the quiz');
    clearInterval(timeInterval);
    if (timeLeft < 0) {
        score = 0;
    } else {
        score = timeLeft;
    }
    elInitials.value = '';
    elStart.style.display = 'none';
    elQuiz.style.display = 'none';
    elTimer.style.display = 'none';
    elFinish.style.display = 'block';
    elScores.style.display = 'none';
    elSwitch.textContent = 'Retake the Quiz';
    state = 'finish';
    elFinalScore.innerHTML = 'Quiz Complete! Your final score is ' + score + '.<br/>You answered ' + rightAnswers + ' out of 5 questions correctly.';
}

// Add listener to all 'response' buttons to wait for user selection.
body.addEventListener('click', function () {
    if (event.target.parentNode.className !== 'response') {
        return;
    }
    console.log('clicked ' + event.target.parentNode.className);
    checkAnswer(event.target.parentNode.id);
});

// Compare the selected answer with the correct answer in the array.
function checkAnswer(choice) {
    var correct = quiz[q].correct;
    console.log('checking answer: is ' + choice + ' === ' + correct);
    if (choice === correct) {
        console.log('right');
        elCheck.style.color = 'green';
        elCheck.innerHTML = '<strong>Correct!</strong>';
        rightAnswers++;
    } else {
        console.log('bzzt wrongo');
        elCheck.style.color = 'red';
        elCheck.innerHTML = '<strong>Incorrect!</strong>';
        timeLeft -= 5;
    }

    // Let the user know whether they chose the correct answer.
    setTimeout(function () {
        elCheck.innerHTML = '';
        nextQuestion();
    }, 1000);
}

// Move to the next object in the quiz array and populate the page with the new text. 
function nextQuestion() {
    console.log('next question');
    q++;
    if (q < quiz.length) {
        elQuestion.innerHTML = quiz[q].question;
        elAns1.innerHTML = quiz[q].ans1;
        elAns2.innerHTML = quiz[q].ans2;
        elAns3.innerHTML = quiz[q].ans3;
        elAns4.innerHTML = quiz[q].ans4;
    } else {
        completeQuiz();
    }
}

// Add listener for user submitting their initials.
elForm.addEventListener('submit', function () {
    console.log('submitting score');
    event.preventDefault();
    initials = elInitials.value;
    scoreboard = JSON.parse(localStorage.getItem('scoreboard'));

    var results = {
        initials: initials,
        score: score
    };
    scoreboard.push(results);
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
    displayScores();
});

// Display the scoreboard.
function displayScores() {
    // Get the scores back out of localstorage.
    console.log('displaying scoreboard');
    scoreboard = JSON.parse(localStorage.getItem('scoreboard'));

    // Empty the scoreboard.
    for (i = elScoreBody.rows.length; i > 0; i--) {
        elScoreBody.deleteRow(i - 1);
    }

    var foundMe = false;
    // Populate the scoreboard from the object retrieved from localstorage.
    for (i = 0; i < scoreboard.length; i++) {
        console.log('looping through scores');
        var row = elScoreBody.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = scoreboard[i].initials;
        cell2.innerHTML = scoreboard[i].score;

        // Highlight the row with the most recent score.
        if (scoreboard[i].initials === initials && scoreboard[i].score === score && foundMe === false) {
            console.log('found me');
            foundMe = true;
            cell1.style.backgroundColor = 'yellow';
            cell2.style.backgroundColor = 'yellow';
        }
    }


    elStart.style.display = 'none';
    elQuiz.style.display = 'none';
    elTimer.style.display = 'none';
    elFinish.style.display = 'none';
    elScores.style.display = 'block';
    elSwitch.innerHTML = 'Take the Quiz';
    state = 'scores';
}

elSwitch.addEventListener('click', function () {
    console.log('switched screens');
    if (state === 'start') {
        displayScores();
    } else {
        console.log('start over');
        startPage();
    }
});