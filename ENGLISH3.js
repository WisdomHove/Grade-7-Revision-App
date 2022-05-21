  
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

        question : "Which drug commonly used?",
        imgSrc : "images/PIC.png",
        choiceA : "Daga",
        choiceB : "Chicken",
        choiceC : "Banana",
        correct : "A"
    },{
        
        question : "Meaning of the slang word (LEKKER)?",
        imgSrc : "images/PIC.png",
        choiceA : "Fun",
        choiceB : "Good",
        choiceC : "Entertaing",
        correct : "B"
    },{
        question : "What is the plural form of sheep?",
        imgSrc : "images/PIC.png",
        choiceA : "Sheep",
        choiceB : "Sheeps",
        choiceC : "Sheps",
        correct : "A"
    },{
        question : "What is the plural form of life?",
        imgSrc : "images/PIC.png",
        choiceA : "Lifes",
        choiceB : "Life",
        choiceC : "Lives",
        correct : "C"
    },{
        question : "Past participle: He ___________ finished with a project?",
        imgSrc : "images/PIC.png",
        choiceA : "Is",
        choiceB : "Was",
        choiceC : "Don't",
        correct : "B"
    },{
        question : "Past participle: She ____________ burned dinner before?",
        imgSrc : "images/PIC.png",
        choiceA : "Do",
        choiceB : "Is",
        choiceC : "Has",
        correct : "C"
    },{
        question : "Past participle: I _______ lived an interesting life?",
        imgSrc : "images/PIC.png",
        choiceA : "Was",
        choiceB : "Have",
        choiceC : "Is",
        correct : "B"
    },{
        question : "Past participle: He _________ lied to me too many times?",
        imgSrc : "images/PIC.png",
        choiceA : "Talk",
        choiceB : "Is",
        choiceC : "Has",
        correct : "C"
    },{
        question : "Present participle: She ________ babysitting tonight?",
        imgSrc : "images/PIC.png",
        choiceA : "Is",
        choiceB : "Was",
        choiceC : "All of above",
        correct : "A"
    },{
        question : "Past participle: The cookies ____________ baked fresh this morning?",
        imgSrc : "images/PIC.png",
        choiceA : "Were",
        choiceB : "Is",
        choiceC : "None of above",
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
		setTimeout(function() {window.location.href="Congratulations.html";}, 3000);
	}else{
		setTimeout(function() {window.location.href="ENGLISH3.html";}, 3000);
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
