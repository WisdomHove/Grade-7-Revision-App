  
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
        question : "In the daylight the human eye is most sensitve to...colour …",
        imgSrc : "images/ns.jpg",
        choiceA : "red",
        choiceB : "green",
        choiceC : "blue",
		correct :"A"
    },{
        question : "What colour is planet mercury...?",
        imgSrc : "images/ns.jpg",
        choiceA : "red",
        choiceB : "dark grey",
        choiceC : "yellow",
		correct :"B"
    },{
        question : "What is the name of the smallest planet with regard to both mars and volume in our solar system.....",
        imgSrc : "images/ns.jpg",
        choiceA : "Earth",
        choiceB : "jupiter",
        choiceC : "Mercury",
		correct :"C"
    },{
        question : "When did john glenn use the space capsule friendship7 to the first orbit of the earth.......",
        imgSrc : "images/ns.jpg",
        choiceA : "1907",
        choiceB : "1972",
        choiceC : "1962",
		correct :"C"
    },{
        question : "What is planet jupiter famous for.",
        imgSrc : "images/ns.jpg",
        choiceA : "Big hole",
        choiceB : "Big red spot",
        choiceC : "Coloured spot",
		correct :"B"
    },{
        question : "Temperature at the surface of the sun is in the region of ",
        imgSrc : "images/ns.jpg",
        choiceA : "2000 c",
        choiceB : "5600 c",
        choiceC : "15 000 000",
		correct :"A"
    },{
        question : "Who was the first men to hit the golf ball on the mood",
        imgSrc : "images/ns.jpg",
        choiceA : "Alan sherpard",
        choiceB : "Tiger woods",
        choiceC : "Golf moon",
		correct :"A"
    },{
        question : "Who discovered the planet urenas in 1781",
        imgSrc : "images/ns.jpg",
        choiceA : "Anoshehen ansari",
        choiceB : "John glenn",
        choiceC : "William hercshel",
		correct :"C"
    },{
        question : "An astronat in the outer speace will obersve as.. in colour",
        imgSrc : "images/ns.jpg",
        choiceA :"White",
        choiceB : "Red.",
		choiceC : "Pink.",
		correct :"A"
    },{
        question : "When was the first pioneer space probe launched by the united states of america.....?",
        imgSrc : "images/ns.jpg",
        choiceA : "1974",
        choiceB : "1958",
        choiceC : "1961",
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
		setTimeout(function() {window.location.href="Congratulations.html";}, 3000);
	}else{
		setTimeout(function() {window.location.href="NaturalScience3.html";}, 3000);
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
