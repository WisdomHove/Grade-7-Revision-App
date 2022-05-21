  
// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
       
        question : "What is the synonym of speak?",
        imgSrc : "images/PIC.png",
        choiceA : "Run",
        choiceB : "Eat",
        choiceC : "Talk",
        correct : "C"
    },{
        question : "What is the antonym of powerful?",
        imgSrc : "images/PIC.png",
        choiceA : "Walk",
        choiceB : "Weak",
        choiceC : "Sing",
        correct : "B"
    },{
        question : "The present tense of cooked is?",
        imgSrc : "images/PIC.png",
        choiceA : "Cooks",
        choiceB : "Couk",
        choiceC : "Cook",
        correct : "C"
    },{
        question : "When did COVID-19 started?",
        imgSrc : "images/PIC.png",
        choiceA : "2019",
        choiceB : "1999",
        choiceC : "2021",
        correct : "A"
    },{
        question : "Present participle: I _____ singing a song.",
        imgSrc : "images/PIC.png",
        choiceA : "Run",
        choiceB : "Sang",
        choiceC : "Am",
        correct : "C"
    },{
        question : "The correct age for teenage stage is _______",
        imgSrc : "images/PIC.png",
        choiceA : "21-29",
        choiceB : "13-19",
        choiceC : "31-39",
        correct : "B"
    },{
        question : "What is the medium communication people use most in S.A?",
        imgSrc : "images/PIC.png",
        choiceA : "Afrikaans",
        choiceB : "Venda",
        choiceC : "English",
        correct : "C"
    },{
        question : "How many months in a year?",
        imgSrc : "images/PIC.png",
        choiceA : "150",
        choiceB : "12",
        choiceC : "67",
        correct : "B"
    },{
        question : "River is a noun?",
        imgSrc : "images/PIC.png",
        choiceA : "True",
        choiceB : "False",
        choiceC : "All the above",
        correct : "A"
 },{
        question : "What is the synonym of 'scared'",
        imgSrc : "images/PIC.png",
        choiceA : "Afraid",
        choiceB : "Happy",
        choiceC : "Loud",
        correct : "A"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 30; // 30s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong(); 
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the correct choice
        clearInterval(TIMER);
		scoreRender();
		show_alert();
		scoreMarks();
		
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}


// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// show the answers

function show_alert(){
    alert();
}


// page redirect

function scoreMarks(){
    const scorePerCent = Math.round(100 * score/questions.length);	
	
	if(scorePerCent >=50){
		setTimeout(function() {window.location.href="ENGLISH3.html";}, 10000);
	}else{
		setTimeout(function() {window.location.href="ENGLISH2.html";}, 10000);
	}
}
	
	
// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "images/ee.png" :
              (scorePerCent >= 60) ? "images/dd.png" :
              (scorePerCent >= 40) ? "images/cc.png" :
              (scorePerCent >= 20) ? "images/bb.png" :
              "images/aa.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
	
}
