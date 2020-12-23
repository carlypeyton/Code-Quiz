# Code-Quiz

Link to Deployed Application: https://carlypeyton.github.io/Code-Quiz/
Link to Github Repository: https://github.com/carlypeyton/Code-Quiz

<img src = "Screen Shot 2020-12-21 at 1.06.57 PM.png">
<img src = "Screen Shot 2020-12-21 at 1.07.11 PM.png">
<img src = "Screen Shot 2020-12-21 at 1.07.27 PM.png">
<img src = "Screen Shot 2020-12-21 at 1.07.43 PM.png">

For this project, I started by creating separate html documents for the index, as well as the highscores page, to avoid having to hide/unhide elements repeatedly. I added in links for CSS, Google Fonts, Bootstrap, and JS. I then created a separate script document with all of the questions for my quiz, to help break up the amount of text on the main js file. 

Next, I began working on my main js file. I divided the js document into 2 sections, one for taking the quiz/index.html, and another for saving/getting/displaying scores/scores.html. I began on the first half, defining variables and assigning variables to DOM elements for future reference. 

Then, I created a function to start the timer, referencing classroom activities to assist with syntax. I created a function to start the quiz, utilizing the .setAttribute, document.createElement, and .appendChild methods that we reviewed in class this week to create content for the quiz. Using a for loop, I made each multiple choice answer a list item, and created a button for each list item. I replaced the quiz intro section with the quiz question and multiple choice options. Next, I created an event listener, so that if the user selects a multiple choice option as a response, the currentAnswer function runs. If the user has answered all of the questions, the timer stops and the quiz ends. The compareAnswer function compares the users choice to the correct answer for each question, subtracting 10 seconds for the clock if incorrect, and moving to the next question. I also used the setTimeout function, to briefly alert the user if their answer was correct or incorrct. 

I created an event listener for the start quiz button, which calls on the startTimer and startQuiz functions. 

I then made a function to end the quiz. I again utilized the methods we reviewed in class this week to create a header, display final user score, create a form for saving initials and score, and a submit button to save score. I created an event listener for the submit button, saving the user score when the user clicks the button, preventing the page from refreshing, and requiring some text input for initials. 

Finally, I made a function to stop the timer. 

I then moved onto the second part of my JS file. I created functions to get highscores, save highscores, show highscores, and clear highscores, again utilizing methods reviewded in class this week to create content and save scores in local storage. To start, I created an empty object for highscores, with an array in which future initials and scores can be saved. When the function to getHighscores runs, if any highscores are saved in local storage they will be displayed. Elsewise, values are set to empty arrays. The showHighscores function calls on the getHighscores function, and creates framework for initials and scores to be displayed. 

Next, the saveScore function, using the new initials and new scores as parameters, calls of the getHighscore function, and pushes the new values to local storage. 

The clearHighscores function removes highscores from local storage, and returns runs showHighscores function (which will show empty string. 

I also updated the CSS for my quiz, styling the buttons, fonts, and layout. My last step was to run my javascript and html through validators to check for errors. 

After learning about jQuery in class on Monday, it clicked that I could probably go back through much of my code and user jQuery to simplify and clean up. However, being short on time I decided to hold off on this, and come back to it after assignment submission. 

One issue I had with this project was getting the url to my deployed application to work. I believe this was due to the fact that I have two html documents. To test this, I renamed the highscores.html to scores.html, so it would be listed after the index.html alphabetically. After trying this, my link worked. However, now I have two of the same file (highscore.html and score.html) saved in my Github repository. I am unsure how to delete one of these files, so will come back to this issue.






