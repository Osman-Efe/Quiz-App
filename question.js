
function Question(que,ans,right){
    this.que = que;
    this.ans = ans;
    this. right = right;

}

Question.prototype.controlAns = function(ans){
    return ans === this.right;
};




