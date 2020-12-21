/////////////////////////////QUIZ HTML///////////////////////////////////
//Define variables
var countdown = 60;
var timerInterval;
var quiz;
var quizEnd;
var questions;

//Assign variables for DOM
var timeLeft = document.querySelector("#time-left");
var quizBody = document.querySelector(".quiz-body");
var quizIntro = document.querySelector(".quiz-intro");

//Function to start timer
function startTimer() {
    //100 seconds on clock
    timeLeft = 100;
    //If time left is more than 0 sec, time is shown and goes down by 1 sec
    if (timeLeft > 0) {
        document.getElementById("time-left").innerHTML = timeLeft;
        timerInterval = setInterval(function () {
            timeLeft--;
            document.getElementById("time-left").innerHTML = timeLeft;
            //If time runs out quiz ends
            if (timeLeft <= 0) {
                stopTimer();
                endQuiz();
                return;
            }
        }, 1000);
    }
}

//Function to start code quiz
function startQuiz() {
    //Current question start
    var currentQuestion = 0;
    //Create div for quiz questions and answers
    quiz = document.createElement("div");
    quiz.setAttribute("class", "quiz-content");
    //Create element for quiz question and display current question
    var quizQuestion = document.createElement("h3");
    quizQuestion.setAttribute("class", "quiz-question");
    quizQuestion.textContent = questions[currentQuestion].question;
    //Create unordered list for multiple choice answers
    var quizAnswers = document.createElement("ul");
    quizAnswers.setAttribute("class", "quiz-answers");
    //For loop that creates buttons for each multiple choice answer
    for (var i = 0; i < 4; i++) {
        //Make each multiple choice answer a list item
        //Create button for each multiple choice answer
        var listEl = document.createElement("li");
        var buttonEl = document.createElement("button");
        buttonEl.setAttribute("class", "quiz-answer");
        buttonEl.setAttribute("quiz-body", i);
        //Set button content
        buttonEl.textContent = questions[currentQuestion].choices[i];
        //Append buttons to list items and list items to quiz answers
        listEl.appendChild(buttonEl);
        quizAnswers.appendChild(listEl);
    }
    //Append questions and answers to quiz
    quiz.appendChild(quizQuestion);
    quiz.appendChild(quizAnswers);
    //Replace quiz body with quiz intro
    quizBody.replaceChild(quiz, quizIntro);
    //All multiple choice buttons variable
    var choiceButtons = quizAnswers.querySelectorAll("button");
    //Event listener for quiz response
    //If user selects answer, run compare answer function and move to next
    //question. If user has answered all questions stop timer and end quiz
    quizAnswers.addEventListener("click", function (event) {
        var element = event.target;
        if (element.matches("button")) {
            var buttonID = element.getAttribute("quiz-body");
            compareAnswer(currentQuestion, buttonID);
            currentQuestion++;
            if (currentQuestion === questions.length) {
                stopTimer();
                endQuiz();
                return;
            }
            //For loop for displaying multiple choice options for each quiz question
            quizQuestion.textContent = questions[currentQuestion].question;
            for (var j = 0; j < 4; j++) {
                choiceButtons[j].textContent = questions[currentQuestion].choices[j];
            }
        }
    });
}
