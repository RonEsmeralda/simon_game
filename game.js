var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        startOver();
        var audio = new Audio("sounds/wrong.mp3");
        audio.play(); 
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
    }
}
function startOver(){
    started = false;
    gamePattern = [];
    level = 0;
}
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);  
}
function playSound(key) {
    if(key == "green"){
        var audio = new Audio("sounds/green.mp3");
        audio.play();  
    }else if(key == "blue"){
        var audio = new Audio("sounds/blue.mp3");
        audio.play(); 
    }else if(key == "red"){
        var audio = new Audio("sounds/red.mp3");
        audio.play(); 
    }else if(key == "yellow"){
        var audio = new Audio("sounds/yellow.mp3");
        audio.play(); 
    }
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){ $("#" + currentColor).removeClass("pressed");},100);
}