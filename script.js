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

//Function to compare user answer to correct answer
function compareAnswer(currentQuestion, buttonID) {
    //Create div and p for Correct/Wrong message user will see for each response
    var userFeedback = document.createElement("div");
    var feedbackEl = document.createElement("p");
    userFeedback.setAttribute("class", "userFeedback");
    //Append feedback to user feedback div and that to the quiz body section
    userFeedback.appendChild(feedbackEl);
    quizBody.appendChild(userFeedback);
    var correctAnswer = (questions[currentQuestion].choices[buttonID] === questions[currentQuestion].answer);
    //If answer is correct or incorrect, user sees brief message pop up
    if (correctAnswer) {
        feedbackEl.textContent = "Correct!";
    } else {
        feedbackEl.textContent = "Wrong!";
        if (timeLeft <= 10) {
            timeLeft = 0;
            clearInterval(timeLeft);
        //If incorrect answer, 10 seconds off of the timer
        } else {
            timeLeft -= 10;
        }
    }
    //Timeout function to set length of message popup
    var clearUserFeedback = setTimeout(function () {
        quizBody.removeChild(userFeedback);
    }, 500);
    setTimeout(clearUserFeedback);
}

//Function to end the quiz
//Use document.createElement to add text/multiple choice elements to page
//and set class and ids, then set text content
function endQuiz() {
    //Create div for quiz end body
    quizEnd = document.createElement("div");
    quizEnd.setAttribute("class", "quiz-end");
    //replace quiz with quiz end page
    quizBody.replaceChild(quizEnd, quiz); 
    //Create gameover header
    var gaveOverEl = document.createElement("h2");
    gaveOverEl.textContent = "Game Over";
    //Create element to show user their score
    var yourScoreEl = document.createElement("h3");
    yourScoreEl.textContent = "You scored " + timeLeft + " points.";
    //Create form element for user to input initials
    var formEl = document.createElement("form");
    formEl.setAttribute("class", "quiz-answers");
    var labelEl = document.createElement("label");
    labelEl.textContent = "Enter initials: ";
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    //Create submit initials button
    var submitEl = document.createElement("input");
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("id", "submit");
    //Append header, score, form and buttons to quiz body
    labelEl.appendChild(inputEl); //input to label
    formEl.appendChild(labelEl); //label to form
    formEl.appendChild(submitEl); //submit button to form
    quizEnd.appendChild(gaveOverEl); //header to quiz end body
    quizEnd.appendChild(yourScoreEl); //score to quiz end body
    quizEnd.appendChild(formEl); // form to quiz end body
    //Event listener to submit score, run save score function
    submitEl.addEventListener("click", function (event) {
        event.preventDefault();
        //User must enter initials or something in box to save score
        //If no highscore, page does not move
        if (inputEl.value === "") {
            return;
        }
        //If user inputs score, save score and  get highscores html
        saveScore(inputEl.value, timeLeft);
        window.location = "highscores.html";
    });
}

//Function to stop the timer countdown
function stopTimer() {
    timeLeft.textContent = countdown;
    clearInterval(timerInterval);
}

////////////////////////HIGHSCORES PAGE HTML//////////////////////////////
//Assign varaibles for DOM
var highscoreList = document.querySelector("#highscore-list");
//Create highscores object with arrays for future initials and scores
var highscores = {
    initials: [],
    scores: [],
};

//Function to get highscores
function getHighscores() {
    //As long as there is at least 1 saved highscore, get highscores from local storage
   var savedHighscoresString = localStorage.getItem("highscores");
   if (savedHighscoresString !== null) {
       //Parse highscores string
       var savedHighscores = JSON.parse(savedHighscoresString);
       highscores.initials = savedHighscores.initials; 
       highscores.scores = savedHighscores.scores;
   }
   //If no highscores in list display empty array
   else {
       highscores.initials = [];
       highscores.scores = [];
       return;
   }
}

//If any scores are saved than run show scores function
if (highscoreList !== null) {
    showHighscores();
}

//function to show highscores, run get highscores
function showHighscores() {
    //Set highscore list equal to empty string
    highscoreList.innerHTML = "";
    getHighscores();
    //As long as i < total num of highscores saved, display
    //highscore list
    for (var i = 0; i < highscores.initials.length; i++) {
        var listEl = document.createElement("li");
        var pEl = document.createElement("p");
        pEl.setAttribute("class", "highscore");
        pEl.textContent = highscores.initials[i] + " - " + highscores.scores[i];
       //Add scores content to list element
        listEl.appendChild(pEl);
        //Append list element to highscores list
        highscoreList.appendChild(listEl);
    }
}

//Function to save score, run get highscores
//New initials and new score as parameters
function saveScore(newInitials, newScore) {
    getHighscores();
    //push new initials and score to highscores
    highscores.initials.push(newInitials);
    highscores.scores.push(newScore);
    //Change highscores to string from array
    var highscoresString = JSON.stringify(highscores);
    //Save highscores to local storage
    localStorage.setItem("highscores", highscoresString);
}