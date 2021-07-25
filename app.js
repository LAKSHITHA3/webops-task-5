
// CREATE A QUIZ CLASS
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

// Create a question Class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// NOW DISPLAY THE QUESTIONS
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

// GUESS ANSWER
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

// SHOW QUIZ PROGRESS
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML =
        `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

// SHOW SCORES
function showScores() {
    let quizEndHTML =
        `
    <h1>|| Quiz Completed ||</h1>
    <h2 id='score'> Your score: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Re-Attempt Quiz</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// create questions here
let questions = [
    new Question(
        "How many months have 28 days?", ["2","1","all of them","Depends if there's a leap year or not"], "all of them"
       ),
       new Question (
         "The answer is really big.",["THE ANSWER.","Really big.","An elephant.","The data given is insufficient."
         ],"THE ANSWER."
       ),
       new Question (
       "A farmer has 17 sheep, all of them but 8 die. How many sheep are still standing?",[ 
        "8","9","25","35"],"8"
       ),
       new Question (
           "What does the Q in IQ stand for?",["Quantity.","Quorum.","Quality.","Quotient."],"Quotient."
         ),
       new Question (
           "How many 0.5cm slices of bread can you cut from a whole bread that's 25cm long? ",["1","25","39","50"],"1"
         ),
];
let quiz = new Quiz(questions);

// display quiz
displayQuestion();