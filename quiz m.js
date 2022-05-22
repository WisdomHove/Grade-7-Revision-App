  
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
        question : "The next number in the number sequence 1 ; 3 ; 5 ; 7 ; … is …",
        imgSrc : "images/maths.jpg",
        choiceA : "8",
        choiceB : "9",
        choiceC : "12",
        correct : "B"
    },{
        question : "Find the ratio of 3 km to 300 m.?",
        imgSrc : "images/maths.jpg",
        choiceA : "1:10",
        choiceB : "10:1",
        choiceC : "2:5",
        correct : "B"
    },{
        question : "Find BC, if the area of the triangle ABC is 36 cm2 and the height AD is 3 cm.",
        imgSrc : "images/maths.jpg",
        choiceA : "18cm",
        choiceB : "10cm",
        choiceC : "24cm",
        correct : "C"
    },{
        question : "How many times a wheel of radius 28 cm must rotate to go 352 m? (Take π = 22/7).",
        imgSrc : "images/maths.jpg",
        choiceA : "200 times",
        choiceB : "400 times",
        choiceC : "300 times",
        correct : "A"
    },{
        question : "A rectangular park is 45 m long and 30 m wide. The path 2.5 m wide is constructed outside the park. Find the area of that path.",
        imgSrc : "images/maths.jpg",
        choiceA : "150 m2",
        choiceB : "400 m2",
        choiceC : "200 m2",
        correct : "B"
    },{
        question : "Find the value of the expression a2 + 2 ab + b2;  if a = 3, b = 2",
        imgSrc : "images/maths.jpg",
        choiceA : "37",
        choiceB : "35",
        choiceC : "25",
        correct : "C"
    },{
        question : "In a computer lab, there are 3 computers for every 6 students. How many computers will be needed for 24 students?",
        imgSrc : "images/maths.jpg",
        choiceA : "12",
        choiceB : "18",
        choiceC : "6",
        correct : "A"
    },{
        question : "The side of an equilateral triangle is 3.5 cm. Find its perimeter.",
        imgSrc : "images/maths.jpg",
        choiceA : "2.7 cm",
        choiceB : "10.5cm",
        choiceC : "5.9 cm",
        correct : "B"
    },{
        question : "Find the value of 2.5 + 5.1",
        imgSrc : "images/maths.jpg",
        choiceA : "8.2",
        choiceB : "2.5",
        choiceC : "7.6",
        correct : "C"
    },{
        question : "The wood cutter took 12 minutes to make 3 pieces of a block of wood. How long would be needed to make 5 such pieces?",
        imgSrc : "images/maths.jpg",
        choiceA : "20 minutes",
        choiceB : "30 minutes",
        choiceC : "50 minutes",
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
		setTimeout(function() {window.location.href="Mathematics2.html";}, 10000);
	}else{
		setTimeout(function() {window.location.href="Mathematics.html";}, 10000);
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
