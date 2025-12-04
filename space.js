const questions=[
    {
        question:"Which planet is closest to the sun?",
        answer:[
            {text:"Earth",correct:false},
            {text:"Mars",correct:false},
            {text:"Venus",correct:false},
            {text:"Mercury",correct:true},
        ]
    },
    {
        question:"What is the name of the galaxy that contains out solor system ?",
        answer:[
            {text:"Triangulum Galaxy",correct:false},
            {text:"Andromeda Galaxy",correct:false},
            {text:"The Milky Way",correct:true},
            {text:"Sandway Galaxy",correct:false},
        ]
    },
    {
        question:"Who was the first human to walk on the surface of the moon?",
        answer:[
            {text:"Buzz aldrin",correct:false},
            {text:"Neil Armstrong",correct:true},
            {text:"Yuri gagarin",correct:false},
            {text:"Micheal collins",correct:false},
        ]
    },
    {
        question:"The Great Red Spot on Jupiter is actually a massive:",
        answer:[
            {text:"Valcano",correct:false},
            {text:"Ocean",correct:false},
            {text:"Crater",correct:false},
            {text:"Storm",correct:true},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerbutton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion =questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML= questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerbutton.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display="block";
}

nextButton.addEventListener("click",()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
});

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();


