const questions=[
    {
        question:"Which social science discipline primarily studies human society, social behavior, and patterns of social relationships?",
        answer:[
            {text:"Sociology",correct:true},
            {text:"Anthropology",correct:false},
            {text:"Economics",correct:false},
            {text:"Political Science",correct:false},
        ]
    },
    {
        question:"The concept of scarcity is central to which social science discipline?",
        answer:[
            {text:"Economics",correct:true},
            {text:"Geography",correct:false},
            {text:"Psychology",correct:false},
            {text:"History",correct:false},
        ]
    },
    {
        question:"What is the primary focus of Political Science",
        answer:[
            {text:"The study of individual mental processes and behaviors",correct:false},
            {text:"The systematic study of governance , political system and pl",correct:true},
            {text:"The development of ancient civilizations",correct:false},
            {text:"The relationShip between physical environment and human activities",correct:false},
        ]
    },
    {
        question:"Which of the following is an example of a social norm?",
        answer:[
            {text:"Shaking hands when meeting someone for the first time. ",correct:true},
            {text:"The rise in inflation due to a change in interest rate.",correct:false},
            {text:"The law against speeding on a highway.",correct:false},
            {text:"A country's constitutional system of checks and balances.",correct:false},
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
