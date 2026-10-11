const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("res-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
});

restartButton.addEventListener('click', () => {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
});

function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.innerHTML = currentQuestionIndex + 1;
    const progpercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progpercent + '%';
    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = '';
    
    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        // FIX: Changed 'coorect' to 'correct'
        button.dataset.correct = answer.correct;
        
        button.addEventListener('click', (event) => {
            if (answersDisabled) return;
            answersDisabled = true;
            let selectButton = event.target;
            let isCorrect = selectButton.dataset.correct === 'true';
            
            Array.from(answersContainer.children).forEach(btn => {
                // FIX: Changed strict boolean comparison '=== true' to string '=== "true"'
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                } else if (btn === selectButton) {
                    btn.classList.add('incorrect');
                }
            });

            if (isCorrect) {
                score++;
                scoreSpan.textContent = score;
            }

            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizQuestions.length) {
                    showQuestion();
                } else {
                    showResults();
                }
            }, 1000);
        });
        answersContainer.appendChild(button);
    });
}

function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    finalScoreSpan.textContent = score;
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You are a genius";
    } else if (percentage >= 50) {
        resultMessage.textContent = "Good Effort!";
    } else {
        resultMessage.textContent = "Keep Studying! You'll get better";
    }
}