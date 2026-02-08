const quizData = {
    "AI in Modern Research": [
        { q: "What is the primary goal of AI in research?", options: ["Making coffee", "Data analysis", "Playing games"], correct: 1 },
        { q: "Which AI branch mimics human neurons?", options: ["Neural Networks", "Hard Drives", "Monitors"], correct: 0 },
        { q: "AI stands for Artificial _______?", options: ["Internet", "Information", "Intelligence"], correct: 2 }
    ],
    "Blockchain Essentials": [
        { q: "What is a key feature of Blockchain?", options: ["Centralization", "Immutability", "Easy Deletion"], correct: 1 },
        { q: "A block contains a ______ of the previous block.", options: ["Photo", "Hash", "Name"], correct: 1 },
        { q: "Which is a common use for Blockchain?", options: ["Smart Contracts", "Watching Movies", "Cooking"], correct: 0 }
    ]
};

let currentQuestions = [];
let currentQuestionIndex = 0;

// Handle Registration
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedSeminar = document.querySelector('select').value;
    currentQuestions = quizData[selectedSeminar];
    currentQuestionIndex = 0;

    if (currentQuestions) {
        document.getElementById('register').style.display = 'none';
        showQuestion();
        document.getElementById('quiz-section').style.display = 'block';
    }
});

// Display the Question
function showQuestion() {
    const data = currentQuestions[currentQuestionIndex];
    const quizBox = document.getElementById('quiz-content');
    
    let html = `<p><strong>Question ${currentQuestionIndex + 1} of 3</strong></p>`;
    html += `<p style="margin-bottom:15px;">${data.q}</p>`;
    
    data.options.forEach((opt, index) => {
        html += `<div style="margin-bottom:10px;">
                    <input type="radio" name="quizOpt" value="${index}"> ${opt}
                 </div>`;
    });
    
    quizBox.innerHTML = html;
}

// THE SUBMIT BUTTON LOGIC
function checkQuiz() {
    const selected = document.querySelector('input[name="quizOpt"]:checked');

    if (!selected) {
        alert("Please select an answer!");
        return;
    }

    const isCorrect = parseInt(selected.value) === currentQuestions[currentQuestionIndex].correct;

    if (isCorrect) {
        currentQuestionIndex++; 
        if (currentQuestionIndex < currentQuestions.length) {
            alert("Correct! Moving to next question...");
            showQuestion(); 
        } else {
            alert("Congratulations! You passed the quiz.");
            finishEverything(); 
        }
    } else {
        alert("Incorrect answer. Try again!");
    }
}

function finishEverything() {
    // 1. Show Certificate
    document.getElementById('certName').textContent = document.getElementById('userName').value;
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('certificate-section').style.display = 'block';
    
    // 2. Show Feedback Box
    document.getElementById('feedback-section').style.display = 'block';
    document.getElementById('certificate-section').scrollIntoView({ behavior: 'smooth' });
}

// Feedback Form Listener
document.getElementById('feedbackForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    this.style.display = 'none';
    document.getElementById('thankYouMsg').style.display = 'block';
});