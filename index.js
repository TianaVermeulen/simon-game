var colours = ["green", "red", "yellow", "blue"];
var gameSequence = [];
var userSequence = [];
var level = 1;

$(document).keypress(function(event){
    if (gameSequence.length == 0) {
        nextSequence(event);
    }
});

function nextSequence(event){
    var randomNumber = Math.floor(Math.random()*4);
    gameSequence.push(randomNumber);
    $("h1").text("Level "+ level);

    gameSequence.forEach(function(sequence, index) {
        setTimeout(function() {
            makeAnimation(colours[sequence]);
            playSound(colours[sequence]);
        }, index * 500);
    });
};

$(".colour-button").click(function(){
    var numberInColors = colours.indexOf(this.id);
    userSequence.push(numberInColors);

    var amountOfUserClicks = userSequence.length;
    
    for (var i=0; i<amountOfUserClicks; i++){

        if (userSequence[i]==gameSequence[i]){
            playSound(this.id);
            makeAnimation(this.id);
        } else {
            wrong();
        }
    };

    if (gameSequence.length>0 && gameSequence.length==userSequence.length){
        userSequence = [];
        setTimeout(function() {
            nextSequence();
            level++
            $("h1").text("Level "+ level);
        }, 1000);
    }
});

function wrong(){
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("h1").text("Game Over");
    $("body").addClass("game-over");

    setTimeout(function(){
        $("h1").text("Press any key to start");
        $("body").removeClass("game-over");
         }, 500);

    startOver();
}

function makeAnimation (id){
    var activeColour = $("."+id);
    activeColour.addClass("pressed");

    setTimeout(function(){
        activeColour.removeClass("pressed");
    }, 100);
};

function playSound(id){
    var audio = new Audio("sounds/"+ id + ".mp3");
    audio.play();
};

function startOver(){
    gameSequence = [];
    userSequence = [];
    level = 1;
}



// OR


// var buttonColours = ["red", "blue", "green", "yellow"];

// var gamePattern = [];
// var userClickedPattern = [];

// var started = false;
// var level = 0;

// $(document).keypress(function() {
//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });

// $(".btn").click(function() {

//   var userChosenColour = $(this).attr("id");
//   userClickedPattern.push(userChosenColour);

//   playSound(userChosenColour);
//   animatePress(userChosenColour);

//   checkAnswer(userClickedPattern.length-1);
// });

// function checkAnswer(currentLevel) {

//     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
//       if (userClickedPattern.length === gamePattern.length){
//         setTimeout(function () {
//           nextSequence();
//         }, 1000);
//       }
//     } else {
//       playSound("wrong");
//       $("body").addClass("game-over");
//       $("#level-title").text("Game Over, Press Any Key to Restart");

//       setTimeout(function () {
//         $("body").removeClass("game-over");
//       }, 200);

//       startOver();
//     }
// }


// function nextSequence() {
//   userClickedPattern = [];
//   level++;
//   $("#level-title").text("Level " + level);
//   var randomNumber = Math.floor(Math.random() * 4);
//   var randomChosenColour = buttonColours[randomNumber];
//   gamePattern.push(randomChosenColour);

//   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//   playSound(randomChosenColour);
// }

// function animatePress(currentColor) {
//   $("#" + currentColor).addClass("pressed");
//   setTimeout(function () {
//     $("#" + currentColor).removeClass("pressed");
//   }, 100);
// }

// function playSound(name) {
//   var audio = new Audio("sounds/" + name + ".mp3");
//   audio.play();
// }

// function startOver() {
//   level = 0;
//   gamePattern = [];
//   started = false;
// }


