  
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
        question : "The perimeter of a regular pentagon with one side equal to 5 cm is…",
        imgSrc : "images/maths.jpg",
        choiceA : "5 cm",
        choiceB : "25 cm",
        choiceC : "33 cm",
        correct : "B"
    },{
        question : "A set of points with a definite starting point and no definite end-point is called?",
        imgSrc : "images/maths.jpg",
        choiceA : "Line segment.",
        choiceB : "Ray",
        choiceC : "Perpendicular line",
        correct : "B"
    },{
        question : "Find BC, if the area of the triangle ABC is 36 cm2 and the height AD is 3 cm.",
        imgSrc : "images/maths.jpg",
        choiceA : "18cm",
        choiceB : "10cm",
        choiceC : "24cm",
        correct : "C"
    },{
        question : "What percentage is 1 200 of 5 000?.",
        imgSrc : "images/maths.jpg",
        choiceA : "24%",
        choiceB : "54%",
        choiceC : "14%",
        correct : "A"
    },{
        question : "32 written as a product of its prime factors is ….",
        imgSrc : "images/maths.jpg",
        choiceA : "1 × 32",
        choiceB : "2 × 2 × 2 × 2 × 2",
        choiceC : "2 × 42",
        correct : "B"
    },{
        question : "Divide. Estimate to check whether the answer is reasonable 306 ÷ 3.4",
        imgSrc : "images/maths.jpg",
        choiceA : "–90",
        choiceB : "900",
        choiceC : "90",
        correct : "C"
    },{
        question : "Solve the following 2.02w = −3.636?",
        imgSrc : "images/maths.jpg",
        choiceA : "–1.8",
        choiceB : "1.8",
        choiceC : "1800",
        correct : "A"
    },{
        question : "Kristi had $7.00 when she went to the store. When she got back, she had $2.36. How much did she spend.",
        imgSrc : "images/maths.jpg",
        choiceA : " $7.64",
        choiceB : " $4.64",
        choiceC : " $10.64",
        correct : "B"
    },{
        question : "Larry took 21 minutes to do 7 math problems. Mary took 19 minutes to do 8 math problems. Which student did more problems per minute?",
        imgSrc : "images/maths.jpg",
        choiceA : "Mary",
        choiceB : "Lary",
        choiceC : "Lebo",
        correct : "A"
    },{
        question : "Two parallelograms are similar. The base of the first is 12 cm, and its height is 8 cm. Find the base of the second parallelogram if its height is 34 cm.?",
        imgSrc : "images/maths.jpg",
        choiceA : "7.11 cm",
        choiceB : "21 cm",
        choiceC : "51 cm",
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
		setTimeout(function() {window.location.href="Mathematics3.html";}, 3000);
	}else{
		setTimeout(function() {window.location.href="Mathematics2.html";}, 3000);
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
