  
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
         
        question : "Mma o apea bogobe sedirwa ke …",
        imgSrc :   "images/sep.jpg",
        choiceA : "wena",
        choiceB : "Bogobe",
        choiceC : "Mma",
        correct : "B"
    },{
        question : "Oka thibela bjang bolwetsi ka kokwana ya korona.?",
        imgSrc :   "images/sep.jpg",
        choiceA : "wa hlapa matsogo",
        choiceB : "go fana sekgoba",
        choiceC : "Tsona ka moka",
        correct : "C"
    },{
        question : "Twatse ya kokwana hloko e thomile ka ngwaga ofe.",
        imgSrc :  "images/sep.jpg",
        choiceA : "2006",
        choiceB : "2019",
        choiceC : "2015",
        correct : "B"
    },{
        question : "Ditshwayo tsa go bontsha gore motho a kaba ana le kokwana hloko(covid 19).",
        imgSrc : "images/sep.jpg",
        choiceA : " go lomiwa ka mpeng",
        choiceB : "mokguhlwane",
        choiceC : "go opa ke hologo",
        correct : "B"
    },{
        question : "Ka ngwaga wa kokwana holoko ya (covid 19) moetapele wa naga ebe ele.",
        imgSrc : "images/sep.jpg",
        choiceA : "Ramaphosa",
        choiceB : "Zuma",
        choiceC : "Thabo mbeki",
        correct : "A"
    },{
        question : "Gona le tshelete yeo e tswelego ya batho ba gose some ka nako ya kokwana hloko ya (covid 19) ebe ele bokae",
        imgSrc :  "images/sep.jpg",
        choiceA : "R37",
        choiceB : "R1000",
        choiceC : "R350",
        correct : "C"
    },{
        question : "Leuba la COVID 19 le thomile nageng efe",
        imgSrc :  "images/sep.jpg",
        choiceA : "America",
        choiceB : "China",
        choiceC : "USA",
        correct : "B"
    },{
        question : " Yengwe yadi Kaonafatso tseo di tsweleditswego rele gare ga leuba ya COVID 19 ke .",
        imgSrc :  "images/sep.jpg",
        choiceA : "johnson johnson",
        choiceB : "ARV",
        choiceC : "Panado",
        correct : "A"
    },{
        question : "Kedi metara tse kae tseo swanetse re fane tsona ge motho ale setshabeng",
        imgSrc :  "images/sep.jpg",
        choiceA : "8.2m",
        choiceB : "2.5m",
        choiceC : "1.5m",
        correct : "C"
    },{
        question : "Ge o hweditswe ona le twatsi ya bolwetsi ba COVID 19 o swanela kego ke tswalelela matsatsi ama kae",
        imgSrc :  "images/sep.jpg",
        choiceA : "20",
        choiceB : "14",
        choiceC : "6",
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
		setTimeout(function() {window.location.href="SEPEDI2.html";}, 3000);
	}else{
		setTimeout(function() {window.location.href="Sepedi.html";}, 3000);
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
