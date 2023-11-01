const questions = [{
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },

        ]
    },
    {
        question: "Which is smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Africa", correct: false },
            { text: "Arctica", correct: false },
            { text: "Australia", correct: true },

        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antaractica", correct: true },

        ]
    },
    {
        question: "Which is smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: false },
            { text: "Bahrin", correct: true },
            { text: "Nebal", correct: false },
            { text: "Shri Lank", correct: false },

        ]
    }


];
const questionElements = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;



function showQuiz() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElements.innerHTML = questionNo + "." + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);

    });
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHtml = "Next";
    showQuize();
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);

    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function handelNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuiz();
    } else {
        showScore();
    }

}

function showScore() {
    resetState();
    questionElements.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handelNextButton();
    } else {
        startQuiz();
    }
});
showQuiz();