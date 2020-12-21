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