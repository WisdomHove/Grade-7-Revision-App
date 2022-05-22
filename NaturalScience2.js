  
// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const Img = document.getElementById("Img");
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
        question : "A dog sweat glands are located around its …",
        imgSrc : "images/ns.jpg",
        choiceA : "Nose and ears",
        choiceB : "Nose and paws",
        choiceC : "Eyes and paws",
		correct :"A"
    },{
        question : "Which of the following is not a renewable resourse.?",
        imgSrc : "images/ns.jpg",
        choiceA : "Coal",
        choiceB : "Petrol",
        choiceC : "Solar",
		correct :"B"
    },{
        question : "Which of the following is a mixture..",
        imgSrc : "images/ns.jpg",
        choiceA : "Table salt(compound sodium chloride)",
        choiceB : "Pure water",
        choiceC : "Gold",
		correct :"A"
    },{
        question : "Which of the following is not part of the innermost whorl of the flower.",
        imgSrc : "images/ns.jpg",
        choiceA : "Stamens",
        choiceB : "Style",
        choiceC : "Pistil",
		correct :"B"
    },{
        question : "The part of a flower that protect the developing bud.",
        imgSrc : "images/ns.jpg",
        choiceA : "Ovary",
        choiceB : "Petal",
        choiceC : "Sepals",
		correct :"C"
    },{
        question : "The energy of the air conditioner in summer is transferred in the school classrooms by.",
        imgSrc : "images/ns.jpg",
        choiceA : "Radiation",
        choiceB : "Convection",
        choiceC : "Conduction",
		correct :"A"
    },{
        question : "The part of the flower that produces the pollen",
        imgSrc : "images/ns.jpg",
        choiceA : "ovary",
        choiceB : "petal",
        choiceC : "anther",
		correct :"C"
    },{
        question : "Which of the following is a non-renewable source of energy?.",
        imgSrc : "images/ns.jpg",
         choiceA : "Tidal power",
        choiceB : "Biomass",
        choiceC : "Uranium ",
		correct :"B"
    },{
        question : "The vitamin which is essencial for blood clouting is",
        imgSrc : "images/ns.jpg",
       choiceA :"vitamin A",
        choiceB : "vitamin B.",
        choiceC : "vitamin C.",
		correct :"B"
    },{
        question : "An organism whose cells contain in a nucleus.....?",
        imgSrc : "images/ns.jpg",
         choiceA : "parastic",
        choiceB : "unicellular",
        choiceC : "Prokayotic.",
		correct :"B"
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
		setTimeout(function() {window.location.href="NaturalScience3.html";}, 10000);
	}else{
		setTimeout(function() {window.location.href="NaturalScience2.html";}, 10000);
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
