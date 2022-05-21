  
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
        question : "How do we pronounce girl in plural form",
        imgSrc : "images/PIC.png",
        choiceA : "Boys",
        choiceB : "Girls",
        choiceC : "Girl",
        correct : "B"
    },{
        question : "Traffic lights have which colour?",
        imgSrc : "images/PIC.png",
        choiceA : "Black",
        choiceB : "Gray",
        choiceC : "Green",
        correct : "C"
    },{
        question : "The opposite of positive is?",
        imgSrc : "images/PIC.png",
        choiceA : "Powerful",
        choiceB : "Easy",
        choiceC : "Negative",
        correct : "C"
    },{
        question : "Which country does the soccer team Bafana Bafana represent?",
        imgSrc : "images/PIC.png",
        choiceA : "SOUTH AFRICA",
        choiceB : "USA",
        choiceC : "CONGO",
        correct : "A"
    },{
        question : "What is sleep in past test",
        imgSrc : "images/PIC.png",
        choiceA : "Sleeping",
        choiceB : "Slept",
        choiceC : "Sleeped",
        correct : "B"
    },{
    
        question : "What is fly in past test",
        imgSrc : "images/PIC.png",
        choiceA : "Flyed",
        choiceB : "Flew",
        choiceC : "Flies",
        correct : "B"
    },{

        question : "What is the correct spelling for this word?",
        imgSrc : "images/PIC.png",
        choiceA : "People",
        choiceB : "Peple",
        choiceC : "Peeple",
        correct : "A"
    },{
        question : "What fish do when it moves from point A to point B?",
        imgSrc : "images/PIC.png",
        choiceA : "Run",
        choiceB : "Swim",
        choiceC : "Fly",
        correct : "B"
    },{
        question : "What is the plural form of fish",
        imgSrc : "images/PIC.png",
        choiceA : "Fishes",
        choiceB : "Fish",
        choiceC : "Fishing",
        correct : "B"
    },{
        question : "Who is the minister of education?",
        imgSrc : "images/PIC.png",
        choiceA : "Maria",
        choiceB : "Jacob",
        choiceC : "Angie",
        correct : "C"
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
		setTimeout(function() {window.location.href="ENGLISH2.html";}, 10000);
	}else{
		setTimeout(function() {window.location.href="ENGLISH.html";}, 10000);
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
