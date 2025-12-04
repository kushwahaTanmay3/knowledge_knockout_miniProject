// --- VARIABLES FOR CREATION PHASE ---
const titleInput = document.querySelector('.quiz input');
const questionInput = document.querySelector('.ques input');
const optionInputs = document.querySelectorAll('.ans .option input[type="text"]');
const radioButtons = document.querySelectorAll('.ans .option input[type="radio"]');
const addBtn = document.querySelector('.add');
const createBtn = document.querySelector('.cr');
const creatorBox = document.querySelector('.box'); // The form container

// This array will hold the questions you create
let questions = [];

// 1. Fix Radio Buttons (Add names so only one can be checked)
radioButtons.forEach((radio, index) => {
    radio.setAttribute('name', 'correctAnswer');
    radio.value = index;
});

// 2. Logic to ADD a question to the list
addBtn.addEventListener('click', function() {
    // Basic Validation
    if (questionInput.value.trim() === "") {
        alert("Please enter a question.");
        return;
    }

    // Check which radio is selected
    let correctIndex = -1;
    radioButtons.forEach((radio, index) => {
        if (radio.checked) correctIndex = index;
    });

    if (correctIndex === -1) {
        alert("Please select the correct answer.");
        return;
    }

    // Format options exactly how the Play logic expects them: {text: "...", correct: true/false}
    let formattedAnswers = [];
    optionInputs.forEach((input, index) => {
        formattedAnswers.push({
            text: input.value,
            correct: index === correctIndex
        });
    });

    // Add to main array
    questions.push({
        question: questionInput.value,
        answer: formattedAnswers
    });

    alert("Question Added!");
    
    // Clear inputs
    questionInput.value = "";
    optionInputs.forEach(input => input.value = "");
    radioButtons.forEach(radio => radio.checked = false);
});

// 3. Logic to CREATE (Switch from Creator Mode to Player Mode)
createBtn.addEventListener('click', function() {
    if (questions.length === 0) {
        alert("Add at least one question!");
        return;
    }

    // Hide the Creator Form
    creatorBox.style.display = "none";

    // Inject the Player UI dynamically
    createPlayerUI();
    
    // Start the Quiz with the created questions
    startQuiz();
});

// --- VARIABLES FOR PLAYING PHASE ---
let currentQuestionIndex = 0;
let score = 0;
let questionElement, answerButtonElement, nextButton;

// Function to generate the HTML for the player
function createPlayerUI() {
    const appDiv = document.createElement('div');
    appDiv.classList.add('app');
    appDiv.style.display = 'block'; // Make it visible

    appDiv.innerHTML = `
        <h1>${titleInput.value || "My Quiz"}</h1>
        <div class="quiz-q" id="question"></div>
        <div id="answer-buttons"></div>
        <button id="next-btn">Next</button>
    `;

    document.body.appendChild(appDiv);

    // Now select these new elements
    questionElement = document.getElementById("question");
    answerButtonElement = document.getElementById("answer-buttons");
    nextButton = document.getElementById("next-btn");

    // Add listener to the new Next button
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    });
}

// --- STANDARD QUIZ FUNCTIONS (From your code) ---

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonElement.appendChild(button); // Corrected variable name here

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtonElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    
    // We need to remove the old listener and add a restart one, 
    // or simply handle the restart logic carefully.
    // Easiest way: clone the button to strip listeners, then add restart.
    const newNextBtn = nextButton.cloneNode(true);
    nextButton.parentNode.replaceChild(newNextBtn, nextButton);
    nextButton = newNextBtn;
    
    nextButton.addEventListener("click", () => {
        // Destroy the current Quiz UI and reload page to start fresh
        // Or simply restart quiz logic:
        startQuiz(); 
        
        // Re-attach the standard loop listener
        nextButton.addEventListener("click", () => {
             currentQuestionIndex++;
             if(currentQuestionIndex < questions.length){
                 showQuestion();
             }else{
                 showScore();
             }
        });
    });
}