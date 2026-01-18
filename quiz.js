
function Quiz(questions){
    this.queIndex = 0;
    this.questions = questions;
    this.trueQuestionNumber = 0;
}

Quiz.prototype.getQuestion = function(){
    return this.questions[this.queIndex];
}




