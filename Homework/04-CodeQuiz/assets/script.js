// You will need to use `setInterval` for the timer.
// You will need to use `localStorage`. What is the part of app that needs to persist?
// You will need use event delegation.
// The Week 4 ToDo's application (`28-Stu_Local-Storage-Todos`) has examples of `localStorage` and event delegation.
var body = document.querySelector('body');
var timerEl = document.querySelector('#timer');
var qText = document.querySelector('#qText');
var introP = document.querySelector('#introP');
var responses = document.querySelectorAll('.response');
var btnStart = document.querySelector('#btnStart');
var btn1 = document.querySelector('#btn1');

var q1 = {
    question: 'Coding Quiz'
};
var q2 = {
    question: 'What is the HTML tag under which one can write the JavaScript code?',
    btn1: '<javascript>',
    btn2: '<scripted>',
    btn3: '<script>',
    btn4: '<js>',
    answer: 'btn3'
};
var q3 = {
    question: 'Choose the correct JavaScript syntax to change the content of the following HTML code:<br \> &lt;p id=\'geek\'&gt;GeeksforGeeks&lt;/p&gt;',
    btn1: 'document.getElement(“geek”).innerHTML=”I am a Geek”;',
    btn2: 'document.getElementById(“geek”).innerHTML=”I am a Geek”;',
    btn3: 'document.getId(“geek”)=”I am a Geek”;',
    btn4: ' document.getElementById(“geek”).innerHTML=I am a Geek;',
    answer: 'btn2'
};

var quiz = [];
quiz.push(q1, q2, q3);
var q = 0;

function countDown() {
    var timeLeft = 3;

    var timeInterval = setInterval(function () {
        timerEl.textContent = timeLeft + " seconds remaining";
        timeLeft--;

        if (timeLeft === 0) {
            localStorage.setItem("timeLeft", timeLeft);
            timerEl.textContent = "";
            completeQuiz();
            clearInterval(timeInterval);
        }

    }, 1000);
}

btnStart.addEventListener('click', function () {
    introP.style.display = 'none';
    this.style.display = 'none';
    for (i = 0; i < responses.length; i++) {
        responses[i].style.display = 'flex';
    }
    nextQuestion();
    // countDown();
});

body.addEventListener('click', function () {
    if (event.target.className !== 'btn response') {
        return;
    }
    checkAnswer(event.target.id);
    nextQuestion();
});

function checkAnswer(choice) {
    if (choice == quiz[q].answer) {
        alert("yep");
    } else {
        alert("nope");
    }
}

function nextQuestion() {
    q++;
    if (q < quiz.length) {
        qText.innerHTML = quiz[q].question;
        btn1.textContent = quiz[q].btn1;
        btn2.textContent = quiz[q].btn2;
        btn3.textContent = quiz[q].btn3;
        btn4.textContent = quiz[q].btn4;
    } else {
        completeQuiz();
    }
}

function completeQuiz() {
    // event.preventDefault();
    var score = localStorage.getItem("timeLeft");
    qText.innerHTML = "QUIZ COMPLETE " + score;
    for (i = 0; i < responses.length; i++) {
        responses[i].style.display = 'none';
    }

}