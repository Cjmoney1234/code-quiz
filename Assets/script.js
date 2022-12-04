// Declared Variables
var startQuizDiv = document.getElementById("start-page");
var startQuizButton = document.getElementById("start-btn");
var quizBody = document.getElementById("quiz");
var finalScoreEl = document.getElementById("final-score");
var gameoverSection = document.getElementById("game-over");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startPageHighscores = document.getElementById("start-page-highscore")
var highscoreContainer = document.getElementById("highscore-container");
var highscoreSection = document.getElementById("highscore-page");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("end-game-btns");
var submitScoreBtn = document.getElementById("submit-score");
var highscoreDisplayScore = document.getElementById("highscore-score");
var playAgain = document.getElementById("play-again");
var ClearHighscore = document.getElementById("clear-highscore");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var endOfGame = document.getElementById("endOfGame");
var answerDisplay = document.getElementById("answer-display");


var quizQuestions = [{
    question: "What is the correct JavaScript syntax to write 'Hello World'?",
    choiceA: "response.write('Hello World')",
    choiceB: "Hello World",
    choiceC: "document.write('Hello World')",
    choiceD: "('Hello World')",
    correctAnswer: "c"},
   {
    question: "Where is the correct place to insert a JavaScript?",
    choiceA: "Both the head and the body section are correct",
    choiceB: "The body section",
    choiceC: "The head section",
    choiceD: "None of the above",
    correctAnswer: "a"},
    {
    question: "How do you call a function named 'myFunction'?",
    choiceA: "call myFunction()",
    choiceB: "myFunction()",
    choiceC: "call function myFunction",
    choiceD: "Call.myFunction()",
    correctAnswer: "b"},
    {
    question: "What does CSS stand for?",
    choiceA: "Cascading Style Sheets",
    choiceB: "Computer Style Sheets",
    choiceC: "Creative Style Sheets",
    choiceD: "Colorful Style Sheets",
    correctAnswer: "a"},
    {
    question: "Which character is used to indicate an end tag?",
    choiceA: "?",
    choiceB: "/",
    choiceC: ">",
    choiceD: "<",
    correctAnswer: "b"},
    ];
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 30;
var timerInterval;
var score = 0;
var correct;

// function generate quiz questions
function generateQuizQuestion(){
    gameoverSection.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function.
function startQuiz(){
    gameoverSection.style.display = "none";
    startQuizDiv.style.display = "none";
    endGameBtns.style.display = "none";
    highscoreContainer.style.display = "none"
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
        quizTimer.style.color = "greenyellow";
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// Show score function
function showScore(){
    quizBody.style.display = "none"
    gameoverSection.style.display = "block";
    endOfGame.style.display = "block";

    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You scored a " + score + " out of " + quizQuestions.length;
    
}

// Event Listeners
startQuizButton.addEventListener("click",startQuiz);
startPageHighscores.addEventListener("click",showHighscore)
playAgain.addEventListener("click", replayQuiz)
ClearHighscore.addEventListener("click",clearScore)
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Please enter initials!");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverSection.style.display = "none";
        highscoreContainer.style.display = "block";
        highscoreSection.style.display = "block";
        endGameBtns.style.display = "block";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// Generate Scores
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i < highscores.length; i++){
        var newNameSpan = document.createElement("ul");
        var newScoreSpan = document.createElement("ul");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages from 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverSection.style.display = "none";
    highscoreContainer.style.display = "block";
    highscoreSection.style.display = "block";
    endOfGame.style.display = "block";
    endGameBtns.style.display = "block";
    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverSection.style.display = "none";
    startQuizDiv.style.display = "block";
    timeLeft = 30;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;
    var h2 = document.createElement("h2");
    answerDisplay.appendChild(h2);

    setTimeout(function() {
        h2.style.display = "none";
    }, 1000);

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        h2.textContent = "Correct!";
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        h2.textContent = "Incorrect!";
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}
