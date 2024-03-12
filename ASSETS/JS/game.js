const questions = [
    {
        question: "What is Harry Potter's middle name?",
        choices: ["James", "John", "Jacob", "Jason"],
        answer: "James"
    },
    {
        question: "Who was the Half-Blood Prince?",
        choices: ["Severus Snape", "Sirius Black", "Remus Lupin", "Albus Dumbledore"],
        answer: "Severus Snape"
    },
    {
        question: "What creature guards the entrance to the Gryffindor common room?",
        choices: ["The Fat Lady", "The Bloody Baron", "The Grey Lady", "The Fat Friar"],
        answer: "The Fat Lady"
    },
    {
        question: "What is the name of Harry Potter's owl?",
        choices: ["Hedwig", "Errol", "Pigwidgeon", "Crookshanks"],
        answer: "Hedwig"
    },
    {
        question: "What is the name of the Weasley's house?",
        choices: ["The Burrow", "Shell Cottage", "Grimmauld Place", "Godric's Hollow"],
        answer: "The Burrow"
    },
    {
        question: "What is the name of the potion that grants luck?",
        choices: ["Felix Felicis", "Polyjuice Potion", "Veritaserum", "Amortentia"],
        answer: "Felix Felicis"
    },
    {
        question: "Who is the author of the Harry Potter series?",
        choices: ["J.K. Rowling", "Stephen King", "George R.R. Martin", "J.R.R. Tolkien"],
        answer: "J.K. Rowling"
    },
    {
        question: "What is the name of the goblin who helps Harry break into Gringotts?",
        choices: ["Griphook", "Bogrod", "Gornuk", "Ragnok"],
        answer: "Griphook"
    },
    {
        question: "What is the name of the tree that the Weasley's car crashes into?",
        choices: ["The Whomping Willow", "The Wailing Willow", "The Weeping Willow", "The Wandering Willow"],
        answer: "The Whomping Willow"
    },
    {
        question: "What is the name of the bank where wizards keep their money?",
        choices: ["Gringotts", "Galleons", "Goblins", "Goldgrip"],
        answer: "Gringotts"
    }
];

let currentQuestion = 0;
let lives = 3;

const lifeIcon = document.getElementById('life-icon');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');
const exitButton = document.getElementById('exit-btn');

function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = "";

    question.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-btn');
        button.addEventListener('click', () => checkAnswer(choice));
        choicesElement.appendChild(button);
    });
}

function checkAnswer(answer) {
    const correctAnswer = questions[currentQuestion].answer;
    if (answer === correctAnswer) {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult("Congratulations! You've completed the quiz.");
        }
    } else {
        lives--;
        lifeIcon.textContent = "⚡".repeat(lives);
        document.body.classList.add('flicker-effect');
        setTimeout(function() {
            document.body.classList.remove('flicker-effect');
        }, 500);
        if (lives === 0) {
            showResult("Game over! You ran out of lives.");
        } else {
            showQuestion();
        }
    }
}

function showResult(message) {
    resultElement.textContent = message;
    if (lives > 0) {
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
    } else {
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
        restartButton.style.display = 'inline-block';
        exitButton.style.display = 'inline-block';
    }
}


function restartQuiz() {
    currentQuestion = 0;
    lives = 3;
    lifeIcon.textContent = "⚡⚡⚡";
    showQuestion();
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
}

document.getElementById('hogwartsButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});;

restartButton.addEventListener('click', restartQuiz);
exitButton.addEventListener('click', () => window.close());

document.getElementById('exit-btn').addEventListener('click', function() {
    window.location.href = 'index.html';
});

showQuestion();
