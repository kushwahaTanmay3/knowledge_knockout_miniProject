const questions=[
    {
        question:"Which organelle is often referred to as the 'powerhouse' of the cell because it generates most of the cell's supply of ATP?",
        answer:[
            {text:"Mitochondrion",correct:false},
            {text:"Nucleus",correct:true},
            {text:"Ribosome",correct:false},
            {text:"Cell well",correct:false},
        ]
    },
    {
        question:"What is the chemical symbol for the element Gold?",
        answer:[
            {text:"Ag",correct:true},
            {text:"Gd",correct:false},
            {text:"Au",correct:false},
            {text:"Go",correct:false},
        ]
    },
    {
        question:"In Physics, what is the standard unit of measurement for force?",
        answer:[
            {text:"Watt",correct:false},
            {text:"Newton",correct:true},
            {text:"Joule",correct:false},
            {text:"Pascal",correct:false},
        ]
    },
    {
        question:"The process by which plants convert light energy into chemical energy (food) is called:",
        answer:[
            {text:"Transpiration",correct:false},
            {text:"Respiration",correct:false},
            {text:"Germination",correct:false},
            {text:"Photosynthesis",correct:true},
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
