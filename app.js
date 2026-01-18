
const questionList = [
    new Question("1- Hangisi Javascript paket yönetim uygulamasıdır?",{a: "Node Js" , b:"Typescript", c:"Nuget", d:"Npm"} ,"d"),
    new Question("2- Hangisi frontend kapsamında değerlendirilmez?",{a: "CSS" , b:"HTML", c:"Javascript", d:"SQL"} ,"d"),
    new Question("3- Hangisi backend kapsamında değerlendirilir?",{a: "Node Js" , b:"Typescript", c:"Angular", d:"React"} ,"a"),
    new Question("4- Hangisi Javascript programlama  dilini kullanmaz?",{a: "React" , b:"Angular", c:"Vue Js", d:"ASP.NET"} ,"d")

];

const quiz = new Quiz(questionList);
const ui = new UI();


ui.btnStart.addEventListener("click", function() {
    startTimer(10);
    startTimerLine();
    ui.quizBox.classList.add("active");
    ui.buttonBox.classList.remove("active");
    ui.showQuestion(quiz.getQuestion()); 
    ui.showNumberofQuestion(quiz.queIndex + 1, quiz.questions.length);
    ui.btnNext.classList.remove("show");

});

ui.btnNext.addEventListener("click", function() {
    if (quiz.questions.length != quiz.queIndex) {
        startTimer(10);
        startTimerLine();
        ui.showQuestion(quiz.getQuestion()); 
        ui.showNumberofQuestion(quiz.queIndex + 1, quiz.questions.length);
        ui.btnNext.classList.remove("show");

    }
    else {
        ui.scoreBox.classList.add("active");
        ui.quizBox.classList.remove("active");
        ui.showScore(quiz.trueQuestionNumber,quiz.questions.length);
    }
});

function optionSelected(e){
    clearInterval(counter);
    clearInterval(counterLine);
    let selecetedElement = e.target;

    if(selecetedElement.nodeName == "SPAN"){
        selecetedElement = selecetedElement.parentElement;
    }

    const cevap = e.target.textContent[0];
    const soru = quiz.getQuestion();

    if(soru.controlAns(cevap)){
        quiz.trueQuestionNumber += 1;
        selecetedElement.classList.add("correct");
        selecetedElement.insertAdjacentHTML("beforeend", ui.correctIcon);
    }
    else{
        selecetedElement.classList.add("incorrect");
        selecetedElement.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }

    quiz.queIndex += 1;
    ui.disableAllOption();
    ui.btnNext.classList.add("show");

}


ui.btnQuit.addEventListener("click", function(){
    window.location.reload();
});

ui.btnReplay.addEventListener("click", function(){
    quiz.queIndex = 0;
    quiz.trueQuestionNumber = 0;
    // start button
    ui.btnStart.click();
    ui.scoreBox.classList.remove("active");
});


let counter;
function startTimer(time){
    counter = setInterval(timer, 1000);

    function timer(){
        ui.timeSecond.textContent = time;
        time--;

        if(time < 0){
            clearInterval(counter);
            ui.timeText.textContent = "Süre bitti";
            

            ui.disableAllOption();
            quiz.queIndex += 1;

            ui.btnNext.classList.add("show");
        }
    }
}

let counterLine;
function startTimerLine() {
    let line_width = 0;

    counterLine = setInterval(timer, 20);

    function timer(){
        line_width += 1;
        ui.timeLine.style.width = line_width + "px";

        if(line_width > 549){
            clearInterval(counterLine);
        }

    }
}