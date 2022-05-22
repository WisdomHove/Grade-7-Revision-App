  
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
       
        question : "Go topa tsa fase",
        imgSrc : "images/sep.jpg",
        choiceA : "Ke go hloka",
        choiceB : "Go seba",
        choiceC : "Go kwa bohloko",
        correct : "A"
    },{
        question : "Ge bare tswalang le ate ba ra goreng?",
        imgSrc : "images/sep.jpg",
        choiceA : "Go raloka",
        choiceB : "Go sega",
        choiceC : "Go belega",
        correct : "C"
    },{
        question : "Go fahla magotlo",
        imgSrc : "images/sep.jpg",
        choiceA : "Go bolaya magotlo",
        choiceB : "Go rota",
        choiceC : "Go kimisa magotlo",
        correct : "B"
    },{
        question : "Ngwana magana go botswa o wetse komeng are:",
        imgSrc : "images/sep.jpg",
        choiceA : "Koma ke ya geso",
        choiceB : "Ke ya ngwana",
        choiceC : "Ke ya kgosi",
        correct : "A"
    },{
        question : "Se bone thola boreledi teng ya gona:",
        imgSrc : "images/sep.jpg",
        choiceA : "Go a fisa",
        choiceB : "Go a baba",
        choiceC : "Go a tonya",
        correct : "B"
    },{
        question : "Le ge o ka e buela legopeng _______",
        imgSrc : "images/sep.jpg",
        choiceA : "Motho o tlo go botsa",
        choiceB : "O tlo tseba",
        choiceC : "Magokobu a go bona",
        correct : "C"
    },{
        question : "Ngwaga o na le dikgwedi tse kae?",
        imgSrc : "images/sep.jpg",
        choiceA : "Lesome",
        choiceB : "Tharo",
        choiceC : "Lesomepedi",
        correct : "C"
    },{
        question : "Bontshi bja dikgong ke eng?",
        imgSrc : "images/sep.jpg",
        choiceA : "Sehlopha",
        choiceB : "Ngata",
        choiceC : "Leloko",
        correct : "B"
    },{
        question : "Bafana Bafana ke sehlopha sa naga ya",
        imgSrc : "images/sep.jpg",
        choiceA : "Afrika Borwa",
        choiceB : "Botswana",
        choiceC : "Ka moka",
        correct : "A"
 },{
        question : "Afrika Borwa go somiswa mohuta ofe wa tshelete?",
        imgSrc : "images/sep.jpg",
        choiceA : "Dolara",
        choiceB : "Ranta",
        choiceC : "Pula",
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
		setTimeout(function() {window.location.href="Reagolebogisa.html";}, 3000);
	}else{
		setTimeout(function() {window.location.href="SEPEDI3.html";}, 3000);
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
