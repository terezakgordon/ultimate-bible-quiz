import { questions } from "../questions.js";

const startScreen = document.getElementById('start-screen')
const questionScreen = document.getElementById('question-screen')
const endScreen = document.getElementById('end-screen')

const startBtn = document.getElementById('start-btn')
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hide')
    questionScreen.classList.remove('hide')
    startGame()
})

const endReturnBtn = document.getElementById('end-return-btn')
endReturnBtn.addEventListener('click', () => {
    startScreen.classList.remove('hide')
    questionScreen.classList.add('hide')
    endScreen.classList.add('hide')
})

let position, shuffledQuestions, numCorrect

const prevQuestion = document.getElementById('prev-question-btn')
prevQuestion.addEventListener('click', () => {
    position--
    if (numCorrect > 0) {
        numCorrect--;
    } else {
        numCorrect = 0;
    }
    renderQuestion()
})

const nextQuestion = document.getElementById('next-question-btn')
nextQuestion.addEventListener('click', () => {
    position++
    if (numCorrect > questions.length) {
        numCorrect = questions.length;
    }
    renderQuestion()
})

const progressBar = document.getElementById('to-complete-progress-bar')
const quizStatus = document.getElementById('quiz-status')
const question = document.getElementById('question')
const answers = document.getElementById('answers')

function startGame() {
    position = 0
    numCorrect = 0
    prevQuestion.disabled = true
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    renderQuestion()
}

function renderQuestion() {
    resetState()

    if (position + 1 <= shuffledQuestions.length) {
        getQuestion(shuffledQuestions[position])
    } else {
        questionScreen.classList.add('hide')
        endScreen.classList.remove('hide')

        let numCorrectMsg = document.getElementById('num-correct')
        numCorrectMsg.innerHTML = "You answered " + numCorrect + " of " + questions.length + 
                                "<br> questions correctly.";

        // quizStatus.innerHTML = "Quiz completed";
        // startBtn.innerText = 'Replay'
        // startBtn.classList.remove('hide')
        position = 0 
        numCorrect = 0
    }

    if (position <= 0) {
        prevQuestion.disabled = true
    } else {
        prevQuestion.disabled = false
    }
    
    progressBar.style.width = (position + 1) / questions.length * 100 + "%"

    console.log('number correct: ', numCorrect)
    console.log('postion: ', position)
}

function getQuestion(q) {
    quizStatus.innerHTML = "Question " + (position + 1) + " of " + questions.length;
    question.innerText = q.question

    q.options.forEach(option => {
        const button = document.createElement('button')
        button.innerText = option
        button.classList.add('answer-btn')
        answers.appendChild(button)
        button.addEventListener('click', checkAnswer)  
    })
}

function resetState() {
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild)
    }
}

function checkAnswer(e) {
    const selectedButton = e.target
    let selectedAnswer = selectedButton.innerText
    let correctAnswer = shuffledQuestions[position].answer

    if (selectedAnswer.localeCompare(correctAnswer) === 0) {
        selectedButton.classList.add('correct')
        selectedButton.innerHTML += "<i class=\"fa-solid fa-check\"></i>"
        numCorrect++
    } else {
        selectedButton.classList.add('incorrect')
        selectedButton.innerHTML += "<i class=\"fa-solid fa-xmark\"></i>"
    }

    answers.childNodes.forEach((answer) => {
        answer.disabled = true
    })
}