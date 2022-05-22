
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
		question : "The environment that we live in can affect our__",
        imgSrc : "images/LO.jpg",
        choiceA :"Emotional social and physical well-being",
        choiceB : "emotional, social and financial well-being.",
		choiceC : "All of the above.",
		correct :"C",
	},{
        question : "The aim of environment health is to.....?",
        imgSrc : "images/LO.jpg",
        choiceA :"Identify the factors that create unhealthy environments.",
        choiceB : "Reduce the impact of the factors that create unhealthy environments.",
        choiceC : "All of the above",
		correct :"C",
	},{
        question : "Select the sentence in which the term 'mortality rate' has been used correctly.....?",
        imgSrc : "images/LO.jpg",
        choiceA :"The mortality rate was high so people started dressing in summer clothing.",
        choiceB : "The mortality rate in underdeveloped countries is usually higher than the mortality rate in developed countries.",
        choiceC : "The mortality rate of people emigrating to other countries increased when the number of jobs available decreased",
		correct :"B",
	},{
        question :"In the sentence ‘The room was well-ventilated', the word ventilated means:",
        imgSrc : "images/LO.jpg",
        choiceA :"Having air moving through..",
        choiceB : "Items that are better eaten cold.",
        choiceC : "Items that go rotten quickly",
		correct :"A",
	},{
		 question : "In the sentence'Jacob stored all the perishable items in the fridge.'the word perishable refers to...?",
        imgSrc : "images/LO.jpg",
        choiceA :"Items that stay fresh for a long time.",
        choiceB : "Items that are better eaten cold..",
        choiceC: "Items that go rotten quickly.",
		correct :"C",
	},{
		question : "Binge drinking can be classified as..?",
        imgSrc : "images/LO.jpg",
        choiceA :"negative peer pressure.",
        choiceB : "Positive peer pressure.",
        choiceC : "A risky situation.",
		correct :"C",
	},{
	    question : "Risks of binge drinking include..?",
        imgSrc : "images/LO.jpg",
        choiceA :"ruining your reputation.",
        choiceB : "Having fun.",
        choiceC : "Eliminating shyness.",
		correct :"A",
	},{
	   question : "Which one of the following is INCORRECT with regards to substance abuse ...?",
        imgSrc : "images/LO.jpg",
        choiceA :"A large percentage of crimes are related to violence in the home.",
        choiceB :"Substance abuse is not related to violence at home.",
        choiceC : "Some people steal everything they have to buy drugs.",
		correct :"B",
	},{
	    question : "Social Media is a contributing factor to teens using substances because:",
        imgSrc : "images/LO.jpg",
        choiceA :"advertising often gives the message that substance use is acceptable.",
        choiceB :"Teens identify with people in the media who use substances.",
        choiceC :"All of the above.",
		correct :"C",
	
	},{
	   question : "Substance abuse is more risky to a teen because.?",
        imgSrc : "images/LO.jpg",
        choiceA :"Your brain is still developing.",
        choiceB :"You are more at risk of addiction.",
        choiceC : "All of the above.",
		correct :"C",
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
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
		show_alert ();
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
function show_alert()
{
    alert();
}

// page redirect

function scoreMarks(){
    const scorePerCent = Math.round(100 * score/questions.length);	
	
	if(scorePerCent >=50){
		setTimeout(function() {window.location.href="LIFEORIENTATION3.html";},3000);
	}else{
		setTimeout(function() {window.location.href="LIFEORIENTATION2.html";}, 3000);
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
              "Images/aa.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";

}
