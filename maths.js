const questions=[
    {
        question:"What is the result of 25 + 18?",
        answer:[
            {text:"33",correct:false},
            {text:"53",correct:false},
            {text:"43",correct:true},
            {text:"42",correct:false},
        ]
    },
    {
        question:"What is 8x7?",
        answer:[
            {text:"56",correct:true},
            {text:"54",correct:false},
            {text:"64",correct:false},
            {text:"48",correct:false},
        ]
    },
    {
        question:"Solve for x: x - 5 = 10",
        answer:[
            {text:"2",correct:false},
            {text:"5",correct:false},
            {text:"15",correct:true},
            {text:"50",correct:false},
        ]
    },
    {
        question:"Calculate 150 divided 3.",
        answer:[
            {text:"45",correct:false},
            {text:"30",correct:false},
            {text:"15",correct:false},
            {text:"50",correct:true},
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

