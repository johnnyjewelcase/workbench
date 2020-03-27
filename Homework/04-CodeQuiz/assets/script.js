var body = document.querySelector('body');
var qText = document.querySelector('#qText');
var introP = document.querySelector('#introP');
var responses = document.querySelectorAll('.response');
var btnStart = document.querySelector('#btnStart');
// var btn1 = document.querySelector('#btn1');
// var btn2 = document.querySelector('#btn2');
// var btn3 = document.querySelector('#btn3');
// var btn4 = document.querySelector('#btn4');

var q1 = {
    question: 'Coding Quiz'
};

var q2 = {
    question: 'What is the HTML tag under which one can write the JavaScript code?',
    btn1: '<code><javascript></code>',
    btn2: '<code><scripted></code>',
    btn3: '<code><script></code>',
    btn4: '<code><js></code>',
    answer: 'btn3'
};

var q3 = {
    question: 'Choose the correct JavaScript syntax to change the content of the following HTML code:<br \> <code>&lt;p id=\'geek\'&gt;GeeksforGeeks&lt;/p&gt;</code>',
    btn1: '<code>document.getElement(“geek”).innerHTML=”I am a Geek”;</code>',
    btn2: '<code>document.getElementById(“geek”).innerHTML=”I am a Geek”;</code>',
    btn3: '<code>document.getId(“geek”)=”I am a Geek”;</code>',
    btn4: '<code> document.getElementById(“geek”).innerHTML=I am a Geek;</code>',
    answer: 'btn2'
};

var quiz = [];
quiz.push(q1, q2, q3);
var q = 0;
var score = 0;

btnStart.addEventListener('click', function () {
    introP.style.display = 'none';
    this.style.display = 'none';
    for (i = 0; i < responses.length; i++) {
        responses[i].style.display = 'flex';
    }
    nextQuestion();
});


body.addEventListener('click', function () {
    console.log(event.target.parentNode);
    if (event.target.parentNode.className !== 'level response') {
        return;
    }
    checkAnswer(event.target.parentNode.id);
    nextQuestion();
});

// btn1.addEventListener('click', function () {
//     correctAnswer(this.id);
//     nextQuestion();
// });

// btn2.addEventListener('click', function () {
//     correctAnswer(this.id);
//     nextQuestion();
// });

// btn3.addEventListener('click', function () {
//     correctAnswer(this.id);
//     nextQuestion();
// });

// btn4.addEventListener('click', function () {
//     correctAnswer(this.id);
//     nextQuestion();
// });

function checkAnswer(choice) {
    console.log(choice);
    console.log(quiz[q].answer);
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
    } else {
        qText.innerHTML = "QUIZ COMPLETE";
        for (i = 0; i < responses.length; i++) {
            responses[i].style.display = 'none';
        }
    }
}