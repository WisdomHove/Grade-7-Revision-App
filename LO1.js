  
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
        question : "COVID-19 can be spread by …",
        imgSrc : "images/LO.jpg",
        choiceA : "coughing",
        choiceB : "sneezing",
        choiceC : "all of the above",
		correct :"C"
    },{
        question : "We need to ensure we keep a social distance of...?",
        imgSrc : "images/LO.jpg",
        choiceA : "10cm",
        choiceB : "50cm",
        choiceC : "1.5m",
		correct :"C"
    },{
        question : "The COVID-19 virus was first found in.....",
        imgSrc : "images/LO.jpg",
        choiceA : "China",
        choiceB : "America",
        choiceC : "London",
		correct :"A"
    },{
        question : "When we are infected with the virus we have to.......",
        imgSrc : "images/LO.jpg",
        choiceA : "Play with our friends more",
        choiceB : "Drink more water",
        choiceC : "isolate ourselves in our home",
		correct :"C"
    },{
        question : "In which year South Africa became a democratic country?.",
        imgSrc : "images/LO.jpg",
        choiceA : "2004",
        choiceB : "1994",
        choiceC : "2014",
		correct :"B"
    },{
        question : "With-holding basic such as food or clothing is a form of_______",
        imgSrc : "images/LO.jpg",
        choiceA : "Sexual Abuse",
        choiceB : "Emotional Abuse",
        choiceC : "Neglect",
		correct :"C"
    },{
        question : "A support system is______?",
        imgSrc : "images/LO.jpg",
        choiceA : "A way of thinking",
        choiceB : "Friends and family who you can turn to for advice and help",
        choiceC : "A system of achieving high mark",
		correct :"B"
    },{
        question : "A career field is_____.",
        imgSrc : "images/LO.jpg",
        choiceA : "A group of workers",
        choiceB : "A single job",
        choiceC : "A whole lot of similar jobs grouped together",
		correct :"B"
    },{
        question : "Communication means_____",
        imgSrc : "images/LO.jpg",
        choiceA :"Listening to a radio",
        choiceB : "Sending and Receiving information.",
		choiceC : "All of the above",
		correct :"B"
    },{
        question : "I can protect myself from COVID-19 BY.....?",
        imgSrc : "images/LO.jpg",
        choiceA : "Wearing a mask",
        choiceB : "practicing social distancing",
        choiceC : "All of the above",
		correct :"C"
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
		setTimeout(function() {window.location.href="LIFEORIENTATION2.html";}, 3000);
	}else{
		setTimeout(function() {window.location.href="LifeOrientation.html";}, 3000);
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
