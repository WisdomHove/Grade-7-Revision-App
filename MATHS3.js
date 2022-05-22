  
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
        question :"47 – 4 × 5 ÷ 4 + 8.",
        imgSrc : "images/maths.jpg",
        choiceA : "14.75",
        choiceB : "45.33",
        choiceC : "50",
        correct : "C"
    },{
        question : "The numbers 4, 8, 12, 16 are in ....order ?.",
        imgSrc : "images/maths.jpg",
        choiceA : "Ascending .",
        choiceB : "Descending.",
        choiceC : "All of the above.",
        correct : "A"
    },{
        question : "p – 14 for p = 38.",
        imgSrc : "images/maths.jpg",
        choiceA : "38p – 14",
        choiceB : "56",
        choiceC : "24",
        correct : "C"
    },{
        question : "5+3x15/6-2.",
        imgSrc : "images/maths.jpg",
        choiceA : "11",
        choiceB : "10.5",
        choiceC : "12,1",
        correct : "B"
    },{
        question : "The shape that has four equal sides.",
        imgSrc : "images/maths.jpg",
        choiceA : "Rectangle",
        choiceB : "Square",
        choiceC : "Triangle",
        correct : "B"
    },{
        question : "200 = 10n",
        imgSrc : "images/maths.jpg",
        choiceA : "40=n",
        choiceB : "30=n",
        choiceC : "20=n",
        correct : "C"
    },{
        question : " Which is a characteristic of a rational number?",
        imgSrc : "images/maths.jpg",
        choiceA : "It will always repeat",
        choiceB : "It will always terminate",
        choiceC : "It will be written in fraction form",
        correct : "C"
    },{
        question : " Which decimal is less than 3.19.",
        imgSrc : "images/maths.jpg",
        choiceA : "2.7 ",
        choiceB : "3.179",
        choiceC : "5.9",
        correct : "B"
    },{
        question : "The lowest common multiple of 5 and 7.",
        imgSrc : "images/maths.jpg",
        choiceA : "35",
        choiceB : "5",
        choiceC : "12",
        correct : "A"
    },{
        question : "What unit do we use to calculate liquid.",
        imgSrc : "images/maths.jpg",
        choiceA : "Kilo grams",
        choiceB : "Litres",
        choiceC : "Centimeters",
        correct : "B"
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
		setTimeout(function() {window.location.href="Mathematics3.html";}, 3000);
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
