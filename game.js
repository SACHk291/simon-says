var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var toggle = false;


function nextSequence(){
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animation(randomChosenColor);
    makeSound(randomChosenColor);
    userClickedPattern.splice(0,);
}  
function animation(color){
    $("#" + color).fadeOut(200).fadeIn(200);
}

function makeSound(sound){

    switch(sound){
        case "blue":
            var blue = new Audio("./sounds/blue.mp3");
            blue.play();
            break;
        case "red":
            var red = new Audio("./sounds/red.mp3");
            red.play();
            break;


        case "green":
            var green = new Audio("./sounds/green.mp3");
            green.play();
            break;

        case "yellow":
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            break;
    }       
}

function clickedAnimation(key){
    $("#" + key).addClass("pressed");
    setTimeout(function(){
        $("#" + key).removeClass("pressed");
    },100);
}


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    makeSound(userChosenColor);
    clickedAnimation(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
});



$(document).keydown(function(){
    if(toggle === false){
        toggle = true;
        nextSequence();
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){


        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        console.log("wrong");

        $("body").addClass("game-over");

        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("GAME OVER. Press any key to restart.")

        startOver();
    }
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    toggle = false;

}