
var buttonColors = ["red","blue","green","yellow"];
var gamePattern =[];
var  userClickedPattern=[];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }

  });

$(".btn").click(function () {

    var userChoosenColor= $(this).attr("id");
    userClickedPattern.push(userChoosenColor)
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");

        var audio = new Audio("sounds/wrong.mp3");
        audio.play(); 

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200); 

        $("h1").text("Game Over, Press Any key to Restart");

        startover();
    }
   
}


function nextSequence(){
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChoosenColor);
}



function playSound(name) {
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();    
}
function animatePress(currentColor) { 
    $(currentColor).addClass("pressed");
    setTimeout(function() {
    $(currentColor).removeClass("pressed")
   }, 100);  
}

function startover() {
    level=0;
    gamePattern=[];
    started=false;
}


