const questions=[
    {
        question:"Which component is often referred to as the brain of the computer?",
        answer:[
            {text:"RAM",correct:false},
            {text:"CPU(Central Processing Unit",correct:true},
            {text:"Power Supply",correct:false},
            {text:"Hard Drive",correct:false},
        ]
    },
    {
        question:"Computers use the binary number system to store and process data. What digits does this system consist of?",
        answer:[
            {text:"0 and i",correct:true},
            {text:"1 and 2",correct:false},
            {text:"True and false",correct:false},
            {text:"0,1,2,3,4,5,6,7,8,9",correct:false},
        ]
    },
    {
        question:"What is the primary difference between Hardware and Software?",
        answer:[
            {text:" Hardware refers to the physical component, while software refer to the programs and instructions",correct:true},
            {text:"Hardware is used for gaming,While software is used for work. ",correct:false},
            {text:"Hardware is inside the computer ,while software is outside.",correct:false},
            {text:"Hardware is free , while software is outside",correct:false},
        ]
    },
    {
        question:"Which is the smallest continent in the world?",
        answer:[
            {text:"Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"Arctic",correct:false},
            {text:"Africa",correct:false},
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
